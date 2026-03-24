/**
 * AlphaBetaScreen – Light tactile Alpha-Beta Pruning (matches Stitch exactly)
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientScreen } from '../components/GradientScreen';
import { AlphaBetaTree } from '../components/AlphaBetaTree';
import { ControlPanel } from '../components/ControlPanel';
import { ExplanationBox } from '../components/ExplanationBox';
import { Legend, alphaBetaLegendItems } from '../components/Legend';
import { ProgressBar } from '../components/ProgressBar';
import { colors } from '../theme/colors';
import { useAppContext } from '../context/AppContext';
import { useAlphaBeta } from '../hooks/useAlphaBeta';

export const AlphaBetaScreen = ({ navigation }: { navigation: any }) => {
  const { difficulty } = useAppContext();
  const { tree, steps, currentStepIndex, currentStep, explanations, loadingExplanation, playMode, statusText, nextStep, startAutoPlay, pause, reset } = useAlphaBeta(difficulty);
  const isComplete = currentStepIndex >= steps.length - 1 && steps.length > 0;
  const pruneCount = explanations.filter((e) => e.label === 'prune').length;

  return (
    <GradientScreen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.topBar}>
          <View style={styles.topLeft}>
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons color={colors.textSecondary} name="arrow-back" size={20} />
            </Pressable>
            <View>
              <View style={styles.badgeRow}>
                <View style={styles.vizBadge}><Text style={styles.vizBadgeText}>Visualizer</Text></View>
                <Text style={styles.stepCounter}>Step {Math.max(currentStepIndex + 1, 0)} of {steps.length}</Text>
              </View>
              <Text style={styles.screenTitle}>Alpha-Beta Pruning</Text>
            </View>
          </View>
          {currentStep ? (
            <View style={styles.efficiencyBadge}>
              <Text style={styles.effLabel}>AI Insight</Text>
              <Text style={styles.effValue}>{pruneCount > 0 ? `${Math.round(pruneCount / steps.length * 100)}% efficiency` : 'Analyzing...'}</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.desc}>Observing how the search space is reduced by skipping branches that cannot influence the final decision.</Text>

        {/* Tree */}
        <AlphaBetaTree tree={tree} currentStep={currentStep} />
        <Legend items={alphaBetaLegendItems} />

        {/* Pruning Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { flex: 2 }]}>
            <Text style={styles.statCardTitle}>Pruning Condition</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{'if (beta <= alpha) {\n  // Pruning occurs here\n  break;\n}'}</Text>
            </View>
            <View style={styles.statRow}>
              <View style={styles.statMini}>
                <Text style={styles.statMiniLabel}>Total Nodes</Text>
                <Text style={styles.statMiniValue}>{steps.length}</Text>
              </View>
              <View style={styles.statMini}>
                <Text style={[styles.statMiniLabel, { color: colors.tertiary }]}>Pruned</Text>
                <Text style={[styles.statMiniValue, { color: colors.tertiary }]}>{pruneCount}</Text>
              </View>
            </View>
          </View>
          <View style={styles.depthCard}>
            <Text style={styles.depthTitle}>Tree Depth</Text>
            <Text style={styles.depthSub}>Current: {currentStep ? currentStep.depth : 0} of 3</Text>
            <View style={styles.depthBars}>
              {[0.25, 0.75, 0.5, 0.5, 0.25].map((h, i) => (
                <View key={i} style={[styles.depthBar,
                  { height: `${h * 100}%`, backgroundColor: i === 1 ? 'rgba(93,75,225,0.40)' : 'rgba(186,186,175,0.20)' }]} />
              ))}
            </View>
          </View>
        </View>

        <ExplanationBox title="AI Tutor" caption={currentStep ? `Node ${currentStep.nodeId} • depth ${currentStep.depth}` : 'Tap Next Step'} explanations={explanations} loading={loadingExplanation} />
        <ControlPanel playMode={playMode} isComplete={isComplete} statusText={statusText} onNextStep={nextStep} onAutoPlay={startAutoPlay} onPause={pause} onReset={reset} />
      </ScrollView>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 120, gap: 16 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  backButton: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  vizBadge: { backgroundColor: colors.primaryContainer, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  vizBadgeText: { fontSize: 10, fontWeight: '700', color: colors.onPrimaryContainer, textTransform: 'uppercase', letterSpacing: 1 },
  stepCounter: { fontSize: 12, fontWeight: '500', color: colors.textSecondary },
  screenTitle: { fontSize: 28, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.8 },
  desc: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
  efficiencyBadge: { alignItems: 'flex-end', gap: 2 },
  effLabel: { fontSize: 10, fontWeight: '700', color: colors.tertiary, textTransform: 'uppercase', letterSpacing: 0.8 },
  effValue: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14,
    backgroundColor: colors.surfaceContainerLowest, overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.15)',
    fontSize: 12, fontWeight: '600', color: colors.textPrimary,
  },
  statsGrid: { flexDirection: 'row', gap: 12 },
  statCard: {
    padding: 18, borderRadius: 24,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.10)', gap: 12,
  },
  statCardTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary },
  codeBlock: {
    padding: 14, borderRadius: 14,
    backgroundColor: colors.surfaceContainerHighest,
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.20)',
  },
  codeText: { fontSize: 12, fontFamily: 'monospace', color: colors.secondary, lineHeight: 20 },
  statRow: { flexDirection: 'row', gap: 12 },
  statMini: {
    flex: 1, padding: 12, borderRadius: 16, backgroundColor: '#FFFFFF',
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.05)',
    shadowColor: 'rgba(55,56,49,0.03)', shadowOpacity: 1, shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  statMiniLabel: { fontSize: 9, fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase', marginBottom: 4 },
  statMiniValue: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  depthCard: {
    flex: 1, padding: 18, borderRadius: 24,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.10)', gap: 6, overflow: 'hidden',
  },
  depthTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary },
  depthSub: { fontSize: 11, color: colors.textSecondary },
  depthBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 80, marginTop: 8 },
  depthBar: { flex: 1, borderRadius: 3 },
});
