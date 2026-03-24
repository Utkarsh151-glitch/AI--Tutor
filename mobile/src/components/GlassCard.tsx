/**
 * GlassCard – Light tactile card with soft neomorphic shadow
 * White/cream card, soft outward shadow, subtle border.
 */
import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors } from '../theme/colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const GlassCard = ({
  children, style, onPress, pressable = false,
}: React.PropsWithChildren<{
  style?: StyleProp<ViewStyle>; onPress?: () => void; pressable?: boolean;
}>) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: (1 - scale.value) * 4 }],
  }));

  if (pressable || onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.98, { damping: 15 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 15 }); }}
        style={[styles.card, style, animatedStyle]}
      >
        {children}
      </AnimatedPressable>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(186, 186, 175, 0.10)',
    shadowColor: 'rgba(55, 56, 49, 0.08)',
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: { width: 20, height: 20 },
    elevation: 6,
  },
});
