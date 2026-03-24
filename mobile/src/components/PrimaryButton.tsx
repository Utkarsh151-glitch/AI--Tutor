/**
 * PrimaryButton – Solid primary button with shadow
 */
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors } from '../theme/colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PrimaryButton = ({
  label, onPress, style, icon, disabled, variant = 'primary',
}: {
  label: string; onPress: () => void; style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode; disabled?: boolean; variant?: 'primary' | 'secondary';
}) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const bg = variant === 'secondary' ? colors.secondary : colors.primary;
  const shadow = variant === 'secondary' ? 'rgba(53, 92, 204, 0.30)' : 'rgba(93, 75, 225, 0.30)';

  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.95); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      style={[styles.button, { backgroundColor: bg, shadowColor: shadow }, style, disabled && styles.disabled, animatedStyle]}
    >
      {icon}
      <Text style={styles.label}>{label}</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8,
    shadowOpacity: 1, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 6,
  },
  label: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  disabled: { opacity: 0.45 },
});
