/**
 * ProgressBar – Light tactile animated progress
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { colors } from '../theme/colors';

export const ProgressBar = ({ current, total, label }: { current: number; total: number; label?: string }) => {
  const progress = total > 0 ? Math.min(current / total, 1) : 0;
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${progress * 100}%` as any, { duration: 500, easing: Easing.out(Easing.cubic) }),
  }));

  return (
    <View style={styles.container}>
      {label ? (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.fraction}>{current}/{total}</Text>
        </View>
      ) : null}
      <View style={styles.track}>
        <Animated.View style={[styles.fill, animatedStyle]}>
          <View style={styles.fillInner} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 6 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
  fraction: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  track: {
    height: 4, borderRadius: 999,
    backgroundColor: colors.surfaceContainerHighest, overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 999, overflow: 'hidden' },
  fillInner: {
    flex: 1, borderRadius: 999,
    backgroundColor: colors.primary,
    shadowColor: 'rgba(93,75,225,0.40)', shadowOpacity: 1, shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
});
