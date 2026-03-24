/**
 * ControlPanel – Light tactile controls
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors } from '../theme/colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ScaleButton = ({ onPress, disabled, style, children }: {
  onPress: () => void; disabled?: boolean; style?: any; children: React.ReactNode;
}) => {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <AnimatedPressable onPress={onPress} disabled={disabled}
      onPressIn={() => { scale.value = withSpring(0.92, { damping: 12 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 12 }); }}
      style={[style, animStyle, disabled && styles.disabledButton]}>
      {children}
    </AnimatedPressable>
  );
};

export const ControlPanel = ({
  playMode, isComplete, statusText, onNextStep, onAutoPlay, onPause, onReset,
}: {
  playMode: 'manual' | 'auto' | 'paused'; isComplete: boolean; statusText: string;
  onNextStep: () => void; onAutoPlay: () => void; onPause: () => void; onReset: () => void;
}) => (
  <View style={styles.shell}>
    <View style={styles.row}>
      <ScaleButton onPress={onReset} style={styles.sideButton}>
        <Ionicons color={colors.textSecondary} name="refresh" size={22} />
      </ScaleButton>

      {playMode === 'auto' ? (
        <ScaleButton onPress={onPause} style={styles.primaryWrap}>
          <View style={styles.pauseButton}>
            <Ionicons color={colors.error} name="pause" size={20} />
            <Text style={styles.pauseText}>Pause</Text>
          </View>
        </ScaleButton>
      ) : (
        <ScaleButton disabled={isComplete} onPress={onNextStep} style={styles.primaryWrap}>
          <View style={styles.primaryButton}>
            <Text style={styles.primaryText}>Next Step</Text>
            <Ionicons color="#FFFFFF" name="chevron-forward" size={16} />
          </View>
        </ScaleButton>
      )}

      <ScaleButton disabled={isComplete} onPress={playMode === 'auto' ? onPause : onAutoPlay}
        style={[styles.sideButton, playMode === 'auto' && styles.autoActive]}>
        <Ionicons color={playMode === 'auto' ? colors.primary : colors.textSecondary}
          name={playMode === 'auto' ? 'pause-circle' : 'play'} size={22} />
        <Text style={[styles.sideLabel, playMode === 'auto' && { color: colors.primary }]}>Auto</Text>
      </ScaleButton>
    </View>
    <Text style={styles.statusText}>{statusText}</Text>
  </View>
);

const styles = StyleSheet.create({
  shell: {
    backgroundColor: colors.background,
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, gap: 10, borderRadius: 24,
  },
  row: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 },
  sideButton: {
    width: 60, height: 60, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.surfaceContainerLowest, gap: 2,
    borderWidth: 1, borderColor: 'rgba(186, 186, 175, 0.20)',
    shadowColor: 'rgba(55, 56, 49, 0.05)', shadowOpacity: 1, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  sideLabel: { fontSize: 8, fontWeight: '700', textTransform: 'uppercase', color: colors.textMuted },
  autoActive: { backgroundColor: 'rgba(93, 75, 225, 0.05)' },
  disabledButton: { opacity: 0.4 },
  primaryWrap: { flex: 1, maxWidth: 200 },
  primaryButton: {
    height: 60, borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.primary,
    shadowColor: 'rgba(93, 75, 225, 0.40)', shadowOpacity: 1, shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 }, elevation: 8,
  },
  pauseButton: {
    height: 60, borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: 'rgba(179, 55, 78, 0.06)',
  },
  pauseText: { color: colors.error, fontWeight: '800', fontSize: 16 },
  primaryText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  statusText: { color: colors.textMuted, fontSize: 12, textAlign: 'center', fontWeight: '600' },
});
