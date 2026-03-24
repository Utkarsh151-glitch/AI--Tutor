/**
 * AStarGrid – Light tactile grid visualizer
 */
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { AStarStep, GridState } from '../utils/astar';

const screenWidth = Dimensions.get('window').width;

const getCellStyle = (row: number, col: number, grid: GridState, step: AStarStep | null) => {
  if (row === grid.start.row && col === grid.start.col) return { bg: colors.tertiaryContainer, isCurrent: false, isPath: false, label: 'start' };
  if (row === grid.end.row && col === grid.end.col) return { bg: colors.secondaryContainer, isCurrent: false, isPath: false, label: 'end' };
  if (grid.obstacles.some((o) => o.row === row && o.col === col)) return { bg: 'rgba(100,101,92,0.20)', isCurrent: false, isPath: false, label: '' };
  if (!step) return { bg: colors.surfaceContainerLowest, isCurrent: false, isPath: false, label: '' };
  if (step.path.some((p) => p.row === row && p.col === col)) return { bg: 'rgba(93,75,225,0.40)', isCurrent: false, isPath: true, label: '' };
  if (step.node.row === row && step.node.col === col) return { bg: 'rgba(93,75,225,0.40)', isCurrent: true, isPath: false, label: '' };
  if (step.openSet.some((o) => o.row === row && o.col === col)) return { bg: 'rgba(93,75,225,0.10)', isCurrent: false, isPath: false, label: '' };
  if (step.closedSet.some((c) => c.row === row && c.col === col)) return { bg: colors.surfaceContainerHighest, isCurrent: false, isPath: false, label: '' };
  return { bg: colors.surfaceContainerLowest, isCurrent: false, isPath: false, label: '' };
};

const GridCellView = React.memo(({ size, bg, isCurrent, isPath, label }: {
  row: number; col: number; size: number; bg: string; isCurrent: boolean; isPath: boolean; label: string;
}) => {
  const pulseScale = useSharedValue(1);
  React.useEffect(() => {
    if (isCurrent) {
      pulseScale.value = withRepeat(withSequence(
        withTiming(1.15, { duration: 400, easing: Easing.inOut(Easing.sin) }),
        withTiming(1, { duration: 400, easing: Easing.inOut(Easing.sin) }),
      ), -1, true);
    } else {
      pulseScale.value = withTiming(1, { duration: 200 });
    }
  }, [isCurrent, pulseScale]);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulseScale.value }] }));
  return (
    <Animated.View style={[styles.cellOuter, { width: size, height: size }, animStyle]}>
      <View style={[styles.cell, { backgroundColor: bg, width: size - 2, height: size - 2 },
        isCurrent && styles.glowCell, isPath && styles.pathCell]}>
        {label === 'start' ? <Ionicons color={colors.tertiary} name="location" size={12} /> : null}
        {label === 'end' ? <Ionicons color={colors.secondary} name="flag" size={12} /> : null}
        {isCurrent ? <View style={styles.currentDot} /> : null}
        {isPath ? <View style={styles.pathDot} /> : null}
      </View>
    </Animated.View>
  );
});

export const AStarGrid = ({ grid, currentStep }: { grid: GridState; currentStep: AStarStep | null }) => {
  const availableWidth = screenWidth - 56;
  const cellSize = Math.floor(availableWidth / grid.cols) - 3;

  return (
    <View style={styles.container}>
      {Array.from({ length: grid.rows }, (_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: grid.cols }, (_, col) => {
            const info = getCellStyle(row, col, grid, currentStep);
            return (
              <GridCellView key={`${row}-${col}`} row={row} col={col} size={cellSize}
                bg={info.bg} isCurrent={info.isCurrent} isPath={info.isPath} label={info.label} />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10, backgroundColor: colors.surfaceContainerLow, borderRadius: 28, gap: 3,
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.10)',
  },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 3 },
  cellOuter: { alignItems: 'center', justifyContent: 'center' },
  cell: {
    borderRadius: 6, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.05)',
    shadowColor: 'rgba(55,56,49,0.04)', shadowOpacity: 1, shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  glowCell: {
    shadowColor: 'rgba(93,75,225,0.30)', shadowOpacity: 1, shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 }, elevation: 4,
  },
  pathCell: { borderColor: 'rgba(93,75,225,0.30)' },
  currentDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.primary },
  pathDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(93,75,225,0.60)' },
});
