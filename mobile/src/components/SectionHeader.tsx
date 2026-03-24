/**
 * SectionHeader – Light tactile - dark text on white
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export const SectionHeader = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
  <View style={styles.container}>
    {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { gap: 4 },
  eyebrow: { color: colors.primary, fontSize: 10, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  title: { color: colors.textPrimary, fontSize: 34, fontWeight: '800', lineHeight: 40, letterSpacing: -1 },
  subtitle: { color: colors.textSecondary, fontSize: 15, lineHeight: 23 },
});
