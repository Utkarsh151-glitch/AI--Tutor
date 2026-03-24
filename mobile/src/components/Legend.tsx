/**
 * Legend – Light tactile pill-style legend
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type LegendItem = { color: string; label: string };

export const Legend = ({ items }: { items: LegendItem[] }) => (
  <View style={styles.container}>
    {items.map((item, idx) => (
      <View key={idx} style={styles.pill}>
        <View style={[styles.dot, { backgroundColor: item.color }]} />
        <Text style={styles.label}>{item.label}</Text>
      </View>
    ))}
  </View>
);

export const aStarLegendItems: LegendItem[] = [
  { color: colors.gridStart, label: 'Start' },
  { color: colors.gridEnd, label: 'End' },
  { color: colors.gridObstacle, label: 'Wall' },
  { color: colors.gridPath, label: 'Path' },
];

export const alphaBetaLegendItems: LegendItem[] = [
  { color: colors.treeMax, label: 'Active' },
  { color: colors.treePruned, label: 'Pruned' },
];

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: colors.surfaceContainerHigh, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.10)',
  },
  dot: { width: 10, height: 10, borderRadius: 3 },
  label: { fontSize: 10, fontWeight: '700', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8 },
});
