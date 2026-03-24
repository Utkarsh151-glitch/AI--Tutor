/**
 * ThinkingOverlay – Light tactile thinking state
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export const ThinkingOverlay = () => (
  <View style={styles.overlay}>
    <View style={styles.content}>
      <View style={styles.iconShell}>
        <Ionicons color={colors.primary} name="sparkles" size={40} />
      </View>
      <Text style={styles.title}>AI is thinking...</Text>
      <Text style={styles.subtitle}>Preparing your personalized algorithm explanation.</Text>
      <View style={styles.shimmerTrack}>
        <View style={styles.shimmerBar} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, zIndex: 40, justifyContent: 'center', paddingHorizontal: 24,
    backgroundColor: 'rgba(255,252,247,0.96)',
  },
  content: { alignItems: 'center', gap: 16 },
  iconShell: {
    width: 100, height: 100, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(93,75,225,0.06)',
    shadowColor: 'rgba(55,56,49,0.06)', shadowOpacity: 1, shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 }, elevation: 4,
  },
  title: { color: colors.textPrimary, fontSize: 26, fontWeight: '800', letterSpacing: -0.6 },
  subtitle: { maxWidth: 260, color: colors.textSecondary, textAlign: 'center', fontSize: 14, lineHeight: 22 },
  shimmerTrack: { width: 160, height: 3, borderRadius: 999, backgroundColor: colors.surfaceContainerHighest, overflow: 'hidden' },
  shimmerBar: { width: '50%', height: '100%', backgroundColor: colors.primary, borderRadius: 999 },
});
