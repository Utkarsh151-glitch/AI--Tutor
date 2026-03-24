/**
 * ChatScreen – Light tactile AI Chat (matches Stitch exactly)
 */
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientScreen } from '../components/GradientScreen';
import { MessageBubble } from '../components/MessageBubble';
import { ChatComposer } from '../components/ChatComposer';
import { ThinkingOverlay } from '../components/ThinkingOverlay';
import { askDoubt, getApiBaseUrl, getOllamaStatus } from '../services/api';
import { colors } from '../theme/colors';

type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string };

export const ChatScreen = () => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', content: 'Hello! I\'m ready to help you master algorithms. Which data structure or search method would you like to visualize today?' },
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<{
    connected: boolean; reachable: boolean; modelConfigured: string;
    modelAvailable: boolean; availableModels: string[]; error?: string;
  } | null>(null);

  React.useEffect(() => {
    let active = true;
    const loadStatus = async () => {
      try {
        const response = await getOllamaStatus();
        if (active) setStatus({
          connected: Boolean(response?.reachable && response?.modelAvailable),
          reachable: Boolean(response?.reachable),
          modelConfigured: response?.modelConfigured || 'unknown',
          modelAvailable: Boolean(response?.modelAvailable),
          availableModels: response?.availableModels || [],
          error: response?.error,
        });
      } catch {
        if (active) setStatus({
          connected: false, reachable: false, modelConfigured: 'unknown',
          modelAvailable: false, availableModels: [], error: 'Backend request failed',
        });
      }
    };
    void loadStatus();
    return () => { active = false; };
  }, []);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setMessages((prev) => [...prev, { id: `${Date.now()}-user`, role: 'user', content: trimmed }]);
    setInput('');
    setLoading(true);
    try {
      const response = await askDoubt(trimmed);
      setMessages((prev) => [...prev, { id: `${Date.now()}-assistant`, role: 'assistant', content: response.answer }]);
    } catch (error) {
      const message = typeof error === 'object' && error && 'response' in error && typeof (error as any).response?.data?.message === 'string'
        ? (error as any).response?.data?.message
        : 'Could not reach the backend. Make sure Express + Ollama are running.';
      setMessages((prev) => [...prev, { id: `${Date.now()}-fallback`, role: 'assistant', content: message || 'The backend returned an empty error.' }]);
    } finally { setLoading(false); }
  };

  const scrollRef = React.useRef<ScrollView>(null);
  React.useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 150);
  }, [messages.length]);

  return (
    <GradientScreen>
      {loading ? <ThinkingOverlay /> : null}
      <ScrollView ref={scrollRef} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date Separator */}
        <View style={styles.dateSep}>
          <View style={styles.sepLine} />
          <Text style={styles.sepText}>Today • Algorithms</Text>
          <View style={styles.sepLine} />
        </View>

        {/* Messages */}
        {messages.map((m) => <MessageBubble key={m.id} content={m.content} role={m.role} />)}

        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={colors.primary} size="small" />
            <Text style={styles.loadingText}>Thinking through your question...</Text>
          </View>
        ) : null}

        {/* Suggested Prompts */}
        {messages.length <= 2 && !loading ? (
          <View style={styles.chipRow}>
            {['Explain O(n log n)', 'Visualize partitioning', 'Show Java example'].map((chip) => (
              <View key={chip} style={styles.chip}>
                <Text style={styles.chipText}>{chip}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>

      {/* Floating Composer */}
      <View style={styles.composerWrap}>
        <ChatComposer disabled={loading} onChangeText={setInput} onSend={sendMessage} value={input} />
        <Text style={styles.connectionFoot}>
          {status === null ? 'Checking backend...'
            : status.connected ? `Connected to ${status.modelConfigured}`
            : status.reachable ? `Model ${status.modelConfigured} unavailable`
            : `Backend unavailable: ${getApiBaseUrl()}`}
        </Text>
      </View>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 18, paddingTop: 60, paddingBottom: 180, gap: 8 },
  dateSep: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  sepLine: { flex: 1, height: 1, backgroundColor: 'rgba(186,186,175,0.15)' },
  sepText: { fontSize: 10, fontWeight: '600', color: 'rgba(129,129,120,0.60)', textTransform: 'uppercase', letterSpacing: 1 },
  loadingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12,
    backgroundColor: 'rgba(93,75,225,0.04)', borderRadius: 14,
  },
  loadingText: { color: colors.textSecondary, fontSize: 13, fontWeight: '600' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999,
    backgroundColor: 'rgba(93,75,225,0.05)',
    borderWidth: 1, borderColor: 'rgba(93,75,225,0.10)',
  },
  chipText: { color: colors.primary, fontSize: 12, fontWeight: '500' },
  composerWrap: {
    position: 'absolute', bottom: 90, left: 20, right: 20, gap: 6,
  },
  connectionFoot: { color: colors.textMuted, fontSize: 10, lineHeight: 14, paddingHorizontal: 10 },
});
