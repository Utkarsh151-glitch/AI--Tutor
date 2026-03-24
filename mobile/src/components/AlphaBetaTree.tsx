/**
 * AlphaBetaTree – Light tactile tree visualization
 */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming, Easing } from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { AlphaBetaStep, TreeNode } from '../utils/alphaBeta';

const getLevels = (root: TreeNode): TreeNode[][] => {
  const levels: TreeNode[][] = [];
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const sz = queue.length;
    const level: TreeNode[] = [];
    for (let i = 0; i < sz; i++) {
      const node = queue.shift()!;
      level.push(node);
      for (const child of node.children) queue.push(child);
    }
    levels.push(level);
  }
  return levels;
};

const TreeNodeView = React.memo(({ node, isActive, isPruned, isEvaluated }: {
  node: TreeNode; isActive: boolean; isPruned: boolean; isEvaluated: boolean;
}) => {
  const pulseScale = useSharedValue(1);
  React.useEffect(() => {
    if (isActive) {
      pulseScale.value = withRepeat(withSequence(
        withTiming(1.12, { duration: 350, easing: Easing.inOut(Easing.sin) }),
        withTiming(1, { duration: 350, easing: Easing.inOut(Easing.sin) }),
      ), -1, true);
    } else { pulseScale.value = withTiming(1, { duration: 200 }); }
  }, [isActive, pulseScale]);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulseScale.value }] }));

  const getNodeBg = () => {
    if (isPruned) return colors.surfaceContainerLow;
    if (isActive) return 'rgba(93,75,225,0.10)';
    return colors.surfaceContainerLowest;
  };

  return (
    <Animated.View style={[styles.node, {
      backgroundColor: getNodeBg(),
      opacity: isPruned ? 0.35 : 1,
      borderColor: isActive ? 'rgba(93,75,225,0.20)' : 'rgba(186,186,175,0.10)',
    }, isActive && styles.activeNode, animStyle]}>
      <Text style={[styles.nodeType, { color: node.isMaximizing ? colors.primary : colors.secondary }]}>
        {node.isMaximizing ? 'Max' : 'Min'}
      </Text>
      <Text style={[styles.nodeValue, isPruned && { color: colors.textMuted }]}>
        {node.value !== null ? node.value : '–'}
      </Text>
      {isPruned ? (
        <View style={styles.pruneIcon}>
          <Ionicons color={colors.error} name="close" size={14} />
        </View>
      ) : null}
    </Animated.View>
  );
});

export const AlphaBetaTree = ({ tree, currentStep }: { tree: TreeNode; currentStep: AlphaBetaStep | null }) => {
  const levels = React.useMemo(() => getLevels(tree), [tree]);
  const activeNodeId = currentStep?.nodeId ?? '';
  const allPrunedChildren = currentStep?.prunedChildren ?? [];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Alpha/Beta chips */}
        {currentStep ? (
          <View style={styles.abBar}>
            <View style={styles.abChip}>
              <Text style={[styles.abLabel, { color: colors.primary }]}>Alpha</Text>
              <Text style={styles.abValue}>{currentStep.alpha === -Infinity ? '-∞' : currentStep.alpha}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.abChip}>
              <Text style={[styles.abLabel, { color: colors.secondary }]}>Beta</Text>
              <Text style={styles.abValue}>{currentStep.beta === Infinity ? '+∞' : currentStep.beta}</Text>
            </View>
          </View>
        ) : null}

        {levels.map((level, levelIdx) => (
          <View key={levelIdx}>
            {levelIdx > 0 ? (
              <View style={styles.connectorRow}>
                {level.map((node) => (
                  <View key={`c-${node.id}`} style={[styles.connector,
                    allPrunedChildren.includes(node.id) && styles.prunedConnector]} />
                ))}
              </View>
            ) : null}
            <View style={styles.levelRow}>
              {level.map((node) => (
                <TreeNodeView key={node.id} node={node}
                  isActive={node.id === activeNodeId} isPruned={allPrunedChildren.includes(node.id)}
                  isEvaluated={currentStep?.type === 'evaluate' && node.id === currentStep.nodeId} />
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16, backgroundColor: colors.surfaceContainerLowest, borderRadius: 28,
    minWidth: '100%', alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.15)',
    shadowColor: 'rgba(55,56,49,0.08)', shadowOpacity: 1, shadowRadius: 40,
    shadowOffset: { width: 0, height: 20 }, elevation: 6,
  },
  abBar: {
    flexDirection: 'row', alignItems: 'center', gap: 0, marginBottom: 12,
    backgroundColor: colors.surfaceContainerHigh, borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.20)',
  },
  abChip: { paddingHorizontal: 18, paddingVertical: 8, alignItems: 'center' },
  abLabel: { fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  abValue: { fontSize: 14, fontWeight: '800', color: colors.textPrimary },
  divider: { width: 1, height: 30, backgroundColor: 'rgba(186,186,175,0.30)' },
  levelRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, paddingVertical: 4 },
  connectorRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, height: 14, alignItems: 'center' },
  connector: { width: 1.5, height: 14, backgroundColor: 'rgba(186,186,175,0.30)', borderRadius: 1 },
  prunedConnector: { backgroundColor: 'rgba(186,186,175,0.10)' },
  node: {
    width: 52, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', gap: 1,
    borderWidth: 1,
    shadowColor: 'rgba(55,56,49,0.05)', shadowOpacity: 1, shadowRadius: 10,
    shadowOffset: { width: 4, height: 4 }, elevation: 2,
  },
  activeNode: {
    shadowColor: 'rgba(93,75,225,0.15)', shadowOpacity: 1, shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 }, elevation: 6,
  },
  nodeType: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  nodeValue: { fontSize: 14, fontWeight: '800', color: colors.textPrimary },
  pruneIcon: { position: 'absolute', top: -6, right: -8 },
});
