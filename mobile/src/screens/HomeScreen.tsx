/**
 * HomeScreen – Light tactile Dashboard (matches Stitch exactly)
 * Bento stats grid + course cards + daily challenge
 */
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientScreen } from '../components/GradientScreen';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { ProgressBar } from '../components/ProgressBar';
import { colors } from '../theme/colors';

export const HomeScreen = ({ navigation }: { navigation: any }) => (
  <GradientScreen>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>AI Algorithm Tutor</Text>
        <Text style={styles.heroSubtitle}>Master Data Structures & Algorithms</Text>
      </View>

      {/* Stats Grid (Bento) */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(93,75,225,0.10)' }]}>
            <Ionicons color={colors.primary} name="flash" size={20} />
          </View>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Lessons Done</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(0,112,112,0.10)' }]}>
            <Ionicons color={colors.tertiary} name="sparkles" size={20} />
          </View>
          <Text style={styles.statValue}>85%</Text>
          <Text style={styles.statLabel}>AI Mastery</Text>
        </View>
      </View>

      {/* Continue Learning */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      {/* A* Card */}
      <GlassCard style={styles.courseCard} pressable onPress={() => navigation.navigate('AStar')}>
        <View style={styles.cardTop}>
          <View style={[styles.cardIcon, { backgroundColor: colors.surfaceContainer }]}>
            <Ionicons color={colors.primary} name="navigate" size={24} />
          </View>
          <View style={styles.cardBadge}><Text style={styles.cardBadgeText}>Advanced</Text></View>
        </View>
        <Text style={styles.cardTitle}>A* Pathfinding</Text>
        <Text style={styles.cardDesc}>Learn how AI finds the shortest path through complex grids using heuristics.</Text>
        <View style={styles.cardActions}>
          <PrimaryButton label="Resume Lab" onPress={() => navigation.navigate('AStar')} style={styles.cardCta} />
          <View style={styles.bookmarkBtn}><Ionicons color={colors.textSecondary} name="bookmark-outline" size={20} /></View>
        </View>
      </GlassCard>

      {/* Alpha-Beta Card */}
      <GlassCard style={styles.courseCard} pressable onPress={() => navigation.navigate('AlphaBeta')}>
        <View style={styles.cardTop}>
          <View style={[styles.cardIcon, { backgroundColor: colors.surfaceContainer }]}>
            <Ionicons color={colors.secondary} name="git-network" size={24} />
          </View>
          <View style={[styles.cardBadge, { backgroundColor: 'rgba(53,92,204,0.08)' }]}>
            <Text style={[styles.cardBadgeText, { color: colors.onSecondaryContainer }]}>Game Theory</Text>
          </View>
        </View>
        <Text style={styles.cardTitle}>Alpha-Beta Pruning</Text>
        <Text style={styles.cardDesc}>Optimizing Minimax for competitive game AI. Cut off branches that don't matter.</Text>
        <View style={styles.cardActions}>
          <PrimaryButton label="Start Module" variant="secondary" onPress={() => navigation.navigate('AlphaBeta')} style={styles.cardCta} />
          <View style={styles.bookmarkBtn}><Ionicons color={colors.textSecondary} name="bookmark-outline" size={20} /></View>
        </View>
      </GlassCard>

      {/* Daily Challenge */}
      <View style={styles.challengeCard}>
        <View style={styles.challengeIconWrap}><Ionicons name="bulb" size={40} color="rgba(55,56,49,0.10)" /></View>
        <Text style={styles.challengeTitle}>Daily Challenge</Text>
        <Text style={styles.challengeDesc}>Implement a Bloom Filter with 3 hash functions. Earn 50 XP.</Text>
        <ProgressBar current={1} total={3} />
      </View>
    </ScrollView>
  </GradientScreen>
);

const styles = StyleSheet.create({
  content: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 120, gap: 20 },
  hero: { marginBottom: 8, gap: 4 },
  heroTitle: { fontSize: 34, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.8 },
  heroSubtitle: { fontSize: 16, color: colors.textSecondary, lineHeight: 24 },
  statsRow: { flexDirection: 'row', gap: 14 },
  statCard: {
    flex: 1, padding: 18, borderRadius: 20,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.15)',
    shadowColor: 'rgba(55,56,49,0.03)', shadowOpacity: 1, shadowRadius: 20,
    shadowOffset: { width: 4, height: 4 }, elevation: 2,
  },
  statIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  statValue: { fontSize: 24, fontWeight: '800', color: colors.textPrimary },
  statLabel: { fontSize: 10, fontWeight: '600', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 2 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: colors.textPrimary },
  seeAll: { fontSize: 13, fontWeight: '600', color: colors.primary },
  courseCard: { padding: 24, borderRadius: 28, gap: 14 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  cardIcon: {
    width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.05)', shadowOpacity: 1, shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 }, elevation: 1,
  },
  cardBadge: {
    backgroundColor: 'rgba(93,75,225,0.06)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999,
  },
  cardBadgeText: { fontSize: 9, fontWeight: '700', color: colors.onPrimaryContainer, textTransform: 'uppercase', letterSpacing: 1.2 },
  cardTitle: { fontSize: 24, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.4 },
  cardDesc: { fontSize: 14, color: colors.textSecondary, lineHeight: 21 },
  cardActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardCta: { flex: 1 },
  bookmarkBtn: {
    width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.surfaceContainerHigh,
  },
  challengeCard: {
    backgroundColor: colors.surfaceContainerLow, borderRadius: 24, padding: 22,
    borderWidth: 1, borderColor: 'rgba(186,186,175,0.10)', gap: 10, overflow: 'hidden',
  },
  challengeIconWrap: { position: 'absolute', top: 12, right: 12 },
  challengeTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary },
  challengeDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 20, marginBottom: 6 },
});
