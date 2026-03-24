/**
 * AStarScreen – Light tactile A* Pathfinding (matches Stitch exactly)
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientScreen } from '../components/GradientScreen';
import { AStarGrid } from '../components/AStarGrid';
import { ControlPanel } from '../components/ControlPanel';
import { ExplanationBox } from '../components/ExplanationBox';
import { Legend, aStarLegendItems } from '../components/Legend';
import { ProgressBar } from '../components/ProgressBar';
import { colors } from '../theme/colors';
import { useAppContext } from '../context/AppContext';
import { useAStar } from '../hooks/useAStar';

export const AStarScreen = ({ navigation }: { navigation: any }) => {
  const { difficulty } = useAppContext();
  const { grid, steps, currentStepIndex, currentStep, explanations, loadingExplanation, playMode, statusText, nextStep, startAutoPlay, pause, reset } = useAStar(difficulty);
  const isComplete = currentStepIndex >= steps.length - 1 && steps.length > 0;

  return (
    <GradientScreen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.topBar}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons color={colors.textSecondary} name="arrow-back" size={20} />
          </Pressable>
          <Text style={styles.screenTitle}>A* Pathfinding</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Progress */}
        <ProgressBar current={Math.max(currentStepIndex + 1, 0)} total={steps.length} label={`Step ${Math.max(currentStepIndex + 1, 0)} of ${steps.length}`} />

        {/* AI Insight Card */}
        {currentStep ? (
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Ionicons color={colors.primary} name="sparkles" size={16} />
              <Text style={styles.insightLabel}>AI Tutor Insight</Text>
            </View>
            <Text style={styles.insightText}>
              {currentStep.type === 'init' ? 'Initializing the search from the start node.'
                : currentStep.type === 'choose' ? `Evaluating the lowest f-score neighbor. g=${currentStep.g}, h=${currentStep.h}, f=${currentStep.f}`
                : currentStep.type === 'expand' ? `Expanding neighbors at (${currentStep.node.row},${currentStep.node.col}).`
                : currentStep.type === 'pathFound' ? 'Optimal path found! The algorithm has reached the goal.'
                : `Processing node (${currentStep.node.row},${currentStep.node.col})`}
            </Text>
          </View>
        ) : null}

        {/* Grid */}
        <AStarGrid grid={grid} currentStep={currentStep} />
        <Legend items={aStarLegendItems} />

        {/* Stats Bento */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Cost</Text>
            <Text style={styles.statValue}>{currentStep ? currentStep.f : '—'}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Nodes Visited</Text>
            <Text style={styles.statValue}>{currentStep ? currentStep.closedSet.length : 0}</Text>
          </View>
        </View>

        {/* AI Explanations */}
        <ExplanationBox title="AI Tutor" caption={currentStep ? `Node (${currentStep.node.row},${currentStep.node.col})` : 'Tap Next Step'} explanations={explanations} loading={loadingExplanation} />

        {/* Controls */}
        <ControlPanel playMode={playMode} isComplete={isComplete} statusText={statusText} onNextStep={nextStep} onAutoPlay={startAutoPlay} onPause={pause} onReset={reset} />
      </ScrollView>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 120, gap: 16 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backButton: {
    width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.surfaceContainerLowest,
  },
  screenTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.3 },
  insightCard: {
    backgroundColor: 'rgba(255,252,247,0.70)', borderRadius: 18, padding: 16,
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.15)',
    shadowColor: 'rgba(55,56,49,0.08)', shadowOpacity: 1, shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 }, elevation: 4, gap: 8,
  },
  insightHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  insightLabel: { fontSize: 10, fontWeight: '800', color: colors.primaryDim, textTransform: 'uppercase', letterSpacing: 1 },
  insightText: { fontSize: 14, color: colors.textSecondary, lineHeight: 21 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1, padding: 14, borderRadius: 18,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.10)',
  },
  statLabel: { fontSize: 9, fontWeight: '700', color: 'rgba(100,101,92,0.60)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
});
