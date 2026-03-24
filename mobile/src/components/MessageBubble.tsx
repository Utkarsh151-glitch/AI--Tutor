/**
 * MessageBubble – Light tactile chat bubble
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export const MessageBubble = ({ role, content }: { role: 'user' | 'assistant'; content: string }) => {
  const isUser = role === 'user';
  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.assistantContainer]}>
      {!isUser ? (
        <View style={styles.aiLabel}>
          <View style={styles.aiIcon}>
            <Ionicons color={colors.primary} name="sparkles" size={10} />
          </View>
          <Text style={styles.aiLabelText}>Algorithm Tutor</Text>
        </View>
      ) : null}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        <Text style={styles.content}>{content}</Text>
      </View>
      {isUser ? <Text style={styles.delivered}>Delivered</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16, gap: 6 },
  userContainer: { alignItems: 'flex-end' },
  assistantContainer: { alignItems: 'flex-start' },
  aiLabel: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 2, marginLeft: 2 },
  aiIcon: {
    width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(93, 75, 225, 0.10)',
  },
  aiLabelText: { fontSize: 10, fontWeight: '700', color: 'rgba(93,75,225,0.80)', textTransform: 'uppercase', letterSpacing: 0.5 },
  bubble: { maxWidth: '90%', paddingHorizontal: 16, paddingVertical: 14, borderRadius: 20 },
  userBubble: {
    backgroundColor: 'rgba(255,255,255,0.90)', borderTopRightRadius: 6,
    shadowColor: 'rgba(55,56,49,0.08)', shadowOpacity: 1, shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 }, elevation: 3,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.50)',
  },
  assistantBubble: {
    backgroundColor: colors.surfaceContainerLow, borderTopLeftRadius: 6,
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.10)',
    shadowColor: 'rgba(55,56,49,0.04)', shadowOpacity: 1, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 1,
  },
  content: { color: colors.textPrimary, lineHeight: 22, fontSize: 14 },
  delivered: { fontSize: 9, color: 'rgba(129,129,120,0.40)', marginRight: 4, fontWeight: '600' },
});
