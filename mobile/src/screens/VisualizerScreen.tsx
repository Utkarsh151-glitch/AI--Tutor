/**
 * VisualizerScreen – Light tactile algorithm picker
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientScreen } from '../components/GradientScreen';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';

export const VisualizerScreen = ({ navigation }: { navigation: any }) => (
  <GradientScreen>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerBlock}>
        <Text style={styles.heading}>Choose an{'\n'}Algorithm</Text>
        <Text style={styles.subtitle}>Select an AI algorithm to visualize step-by-step with AI-guided explanations.</Text>
      </View>

      {/* A* Card */}
      <GlassCard style={styles.algoCard} pressable onPress={() => navigation.navigate('AStar')}>
        <View style={styles.cardTop}>
          <View style={[styles.cardIcon, { backgroundColor: colors.surfaceContainer }]}>
            <Ionicons color={colors.primary} name="navigate" size={26} />
          </View>
          <View style={styles.cardBadge}><Text style={styles.cardBadgeText}>Advanced</Text></View>
        </View>
        <Text style={styles.algoTitle}>A* Pathfinding</Text>
        <Text style={styles.algoDesc}>Grid-based shortest path with heuristics. Explore how AI navigates complex layouts.</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}><Text style={styles.tagText}>Heuristic</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>Grid</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>Optimal</Text></View>
        </View>
        <PrimaryButton label="Start Lab" onPress={() => navigation.navigate('AStar')} />
      </GlassCard>

      {/* Alpha-Beta Card */}
      <GlassCard style={styles.algoCard} pressable onPress={() => navigation.navigate('AlphaBeta')}>
        <View style={styles.cardTop}>
          <View style={[styles.cardIcon, { backgroundColor: colors.surfaceContainer }]}>
            <Ionicons color={colors.secondary} name="git-network" size={26} />
          </View>
          <View style={[styles.cardBadge, { backgroundColor: 'rgba(53,92,204,0.08)' }]}>
            <Text style={[styles.cardBadgeText, { color: colors.onSecondaryContainer }]}>Game Theory</Text>
          </View>
        </View>
        <Text style={styles.algoTitle}>Alpha-Beta Pruning</Text>
        <Text style={styles.algoDesc}>Game tree search with branch elimination. See how AI makes smart game decisions.</Text>
        <View style={styles.tagRow}>
          <View style={[styles.tag, styles.tagSecondary]}><Text style={[styles.tagText, styles.tagTextSecondary]}>Minimax</Text></View>
          <View style={[styles.tag, styles.tagSecondary]}><Text style={[styles.tagText, styles.tagTextSecondary]}>Pruning</Text></View>
          <View style={[styles.tag, styles.tagSecondary]}><Text style={[styles.tagText, styles.tagTextSecondary]}>Game AI</Text></View>
        </View>
        <PrimaryButton label="Start Module" variant="secondary" onPress={() => navigation.navigate('AlphaBeta')} />
      </GlassCard>
    </ScrollView>
  </GradientScreen>
);

const styles = StyleSheet.create({
  content: { paddingHorizontal: 22, paddingTop: 60, paddingBottom: 120, gap: 20 },
  headerBlock: { gap: 6, marginBottom: 8 },
  heading: { color: colors.textPrimary, fontSize: 38, fontWeight: '800', lineHeight: 44, letterSpacing: -1 },
  subtitle: { color: colors.textSecondary, fontSize: 15, lineHeight: 23 },
  algoCard: { padding: 24, borderRadius: 28, gap: 14 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  cardIcon: {
    width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.05)', shadowOpacity: 1, shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 }, elevation: 1,
  },
  cardBadge: {
    backgroundColor: 'rgba(93,75,225,0.06)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999,
  },
  cardBadgeText: { fontSize: 9, fontWeight: '700', color: colors.onPrimaryContainer, textTransform: 'uppercase', letterSpacing: 1.2 },
  algoTitle: { color: colors.textPrimary, fontSize: 24, fontWeight: '800', letterSpacing: -0.4 },
  algoDesc: { color: colors.textSecondary, fontSize: 14, lineHeight: 21 },
  tagRow: { flexDirection: 'row', gap: 8 },
  tag: { backgroundColor: 'rgba(93,75,225,0.06)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tagSecondary: { backgroundColor: 'rgba(53,92,204,0.06)' },
  tagText: { color: colors.primary, fontSize: 11, fontWeight: '700' },
  tagTextSecondary: { color: colors.secondary },
});
