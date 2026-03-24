/**
 * ExplanationBox – Light tactile AI explanation panel
 */
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export type ExplanationEntry = { step: number; label: string; explanation: string };

export const ExplanationBox = ({
  title, explanations, loading, caption,
}: { title: string; explanations: ExplanationEntry[]; loading?: boolean; caption?: string }) => {
  const scrollRef = React.useRef<ScrollView>(null);
  React.useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [explanations.length]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons color={colors.primary} name="sparkles" size={16} />
        </View>
        <View style={styles.copyWrap}>
          <Text style={styles.title}>{title}</Text>
          {caption ? <Text style={styles.caption}>{caption}</Text> : null}
        </View>
        <View style={styles.countBadge}><Text style={styles.countText}>{explanations.length}</Text></View>
      </View>

      <ScrollView ref={scrollRef} style={styles.scrollArea} nestedScrollEnabled showsVerticalScrollIndicator={false}>
        {explanations.length === 0 && !loading ? (
          <View style={styles.emptyState}>
            <Ionicons color={colors.textMuted} name="arrow-forward-circle" size={20} />
            <Text style={styles.emptyText}>Tap "Next Step" to begin and receive AI explanations.</Text>
          </View>
        ) : null}

        {explanations.map((entry, idx) => (
          <View key={idx} style={[styles.entryWrap, idx === explanations.length - 1 && styles.lastEntry]}>
            <View style={styles.entryHeader}>
              <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>{entry.step}</Text></View>
              <Text style={styles.stepLabel}>{entry.label}</Text>
            </View>
            <Text style={styles.text}>{entry.explanation}</Text>
          </View>
        ))}

        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={colors.primary} size="small" />
            <Text style={styles.loadingText}>AI is analyzing this step...</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,252,247,0.70)', borderRadius: 22, padding: 18, gap: 12,
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.15)',
    shadowColor: 'rgba(55,56,49,0.08)', shadowOpacity: 1, shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 }, elevation: 4,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  copyWrap: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 14, fontWeight: '800' },
  caption: { marginTop: 2, color: colors.textMuted, fontSize: 11, fontWeight: '600' },
  countBadge: {
    backgroundColor: 'rgba(93, 75, 225, 0.08)', width: 26, height: 26,
    borderRadius: 8, alignItems: 'center', justifyContent: 'center',
  },
  countText: { color: colors.primary, fontSize: 11, fontWeight: '800' },
  scrollArea: { maxHeight: 260 },
  emptyState: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12,
    backgroundColor: colors.surfaceContainerLow, borderRadius: 14,
  },
  emptyText: { flex: 1, color: colors.textMuted, fontSize: 13, lineHeight: 20 },
  entryWrap: {
    marginBottom: 12, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: 'rgba(186, 186, 175, 0.15)',
  },
  lastEntry: { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 },
  entryHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  stepBadge: {
    width: 22, height: 22, borderRadius: 7,
    backgroundColor: 'rgba(93, 75, 225, 0.08)', alignItems: 'center', justifyContent: 'center',
  },
  stepBadgeText: { color: colors.primary, fontSize: 10, fontWeight: '800' },
  stepLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
  text: { color: colors.textPrimary, fontSize: 14, lineHeight: 22 },
  loadingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10,
    backgroundColor: 'rgba(93, 75, 225, 0.04)', borderRadius: 12,
  },
  loadingText: { color: colors.textSecondary, fontSize: 13, fontWeight: '600' },
  iconWrap: {
    width: 30, height: 30, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(93, 75, 225, 0.08)',
  },
});
