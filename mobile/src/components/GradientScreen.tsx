/**
 * GradientScreen – Light warm background with subtle blur orbs
 */
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming,
} from 'react-native-reanimated';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

const BlurOrb = ({ size, top, left, color, delay }: {
  size: number; top: number; left: number; color: string; delay: number;
}) => {
  const translateY = useSharedValue(0);
  React.useEffect(() => {
    const t = setTimeout(() => {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-12, { duration: 4000 + delay, easing: Easing.inOut(Easing.sin) }),
          withTiming(12, { duration: 4000 + delay, easing: Easing.inOut(Easing.sin) }),
        ), -1, true);
    }, delay);
    return () => clearTimeout(t);
  }, [translateY, delay]);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));
  return (
    <Animated.View style={[styles.orb, { width: size, height: size, top, left, backgroundColor: color, borderRadius: size / 2 }, animStyle]} />
  );
};

export const GradientScreen = ({ children }: React.PropsWithChildren) => (
  <View style={styles.container}>
    <BlurOrb size={300} top={-60} left={-60} color="rgba(93, 75, 225, 0.05)" delay={0} />
    <BlurOrb size={250} top={height * 0.6} left={width - 80} color="rgba(53, 92, 204, 0.05)" delay={300} />
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  orb: { position: 'absolute', opacity: 1 },
});
