/**
 * SmartAttend — Subject Details Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/subject_details_data_structures/code.html
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Radius, Shadow, Spacing } from '../../constants/spacing';
import { MOCK_SUBJECTS } from '../../mocks/mockData';

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ATTENDANCE_LOG = [
  { date: '20 May 2024', day: 'Mon', status: 'present', time: '10:00 AM' },
  { date: '17 May 2024', day: 'Fri', status: 'present', time: '10:00 AM' },
  { date: '15 May 2024', day: 'Wed', status: 'present', time: '10:02 AM' },
  { date: '13 May 2024', day: 'Mon', status: 'absent', time: '—' },
  { date: '10 May 2024', day: 'Fri', status: 'present', time: '10:01 AM' },
  { date: '08 May 2024', day: 'Wed', status: 'present', time: '10:00 AM' },
];

export default function SubjectDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const subject = MOCK_SUBJECTS.find(s => s.id === id) ?? MOCK_SUBJECTS[0];

  const progressColor = subject.status === 'warning' ? '#F59E0B' : '#16A34A';
  const progressArc = (subject.percentage / 100) * CIRCUMFERENCE;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.onSurface} />
        </Pressable>
        <Text style={styles.headerTitle}>Subject Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={[styles.subjectIcon, { backgroundColor: `${progressColor}18` }]}>
              <Ionicons name={subject.icon as any} size={28} color={progressColor} />
            </View>
            <View style={styles.heroInfo}>
              <Text style={styles.heroSubject}>{subject.name}</Text>
              <Text style={styles.heroCode}>{subject.code} · {subject.credits} Credits</Text>
              <Text style={styles.heroFaculty}>{subject.faculty}</Text>
            </View>
          </View>

          {/* Circular chart */}
          <View style={styles.chartRow}>
            <View style={styles.chartWrap}>
              <Svg width={144} height={144} style={{ transform: [{ rotate: '-90deg' }] }}>
                <Circle cx={72} cy={72} r={RADIUS} stroke="#E5E7EB" strokeWidth={10} fill="transparent" />
                <Circle cx={72} cy={72} r={RADIUS} stroke={progressColor} strokeWidth={10} fill="transparent"
                  strokeDasharray={`${progressArc} ${CIRCUMFERENCE}`} strokeLinecap="round" />
              </Svg>
              <View style={styles.chartCenter}>
                <Text style={[styles.chartPct, { color: progressColor }]}>{subject.percentage}%</Text>
                <Text style={styles.chartSub}>Attendance</Text>
              </View>
            </View>
            <View style={styles.statsBlock}>
              {[
                { label: 'Classes Attended', value: subject.attended, color: progressColor },
                { label: 'Total Classes', value: subject.totalClasses, color: Colors.onSurface },
                { label: 'Classes Missed', value: subject.totalClasses - subject.attended, color: Colors.error },
              ].map((s) => (
                <View key={s.label} style={styles.statRow}>
                  <Text style={[styles.statVal, { color: s.color }]}>{s.value}</Text>
                  <Text style={styles.statLbl}>{s.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {subject.status === 'warning' && (
            <View style={styles.warningBanner}>
              <Ionicons name="warning-outline" size={16} color="#F59E0B" />
              <Text style={styles.warningText}>{subject.warningMessage}</Text>
            </View>
          )}
        </View>

        {/* Description */}
        <View style={styles.descCard}>
          <Text style={styles.descTitle}>About This Subject</Text>
          <Text style={styles.descText}>{subject.description}</Text>
        </View>

        {/* Attendance log */}
        <View style={styles.logSection}>
          <Text style={styles.logTitle}>Recent Attendance</Text>
          {ATTENDANCE_LOG.map((log, i) => (
            <View key={i} style={styles.logRow}>
              <View style={[styles.logDot, { backgroundColor: log.status === 'present' ? '#16A34A' : Colors.error }]} />
              <View style={styles.logInfo}>
                <Text style={styles.logDate}>{log.date} ({log.day})</Text>
                <Text style={[styles.logStatus, { color: log.status === 'present' ? '#16A34A' : Colors.error }]}>
                  {log.status === 'present' ? `Present · ${log.time}` : 'Absent'}
                </Text>
              </View>
              <Ionicons
                name={log.status === 'present' ? 'checkmark-circle' : 'close-circle'}
                size={20}
                color={log.status === 'present' ? '#16A34A' : Colors.error}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface },
  header: { height: 56, paddingHorizontal: Spacing.marginMobile, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.surfaceContainerLowest, borderBottomWidth: 1, borderBottomColor: Colors.outlineVariant },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { ...Typography.titleSm, color: Colors.onSurface, fontWeight: '600' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32, gap: Spacing.lg, paddingHorizontal: Spacing.marginMobile, paddingTop: Spacing.lg },
  heroCard: { backgroundColor: Colors.surfaceContainerLowest, borderRadius: Radius.xl, padding: Spacing.lg, ...Shadow.sm, gap: Spacing.lg },
  heroTop: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  subjectIcon: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  heroInfo: { flex: 1 },
  heroSubject: { ...Typography.headlineMd, color: Colors.onSurface, fontWeight: '700' },
  heroCode: { ...Typography.labelMd, color: Colors.onSurfaceVariant, marginTop: 2 },
  heroFaculty: { ...Typography.bodySm, color: Colors.primaryContainer, fontWeight: '500', marginTop: 4 },
  chartRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xl },
  chartWrap: { position: 'relative', width: 144, height: 144, alignItems: 'center', justifyContent: 'center' },
  chartCenter: { position: 'absolute', alignItems: 'center' },
  chartPct: { fontSize: 24, fontWeight: '700' },
  chartSub: { ...Typography.labelXs, color: Colors.onSurfaceVariant },
  statsBlock: { flex: 1, gap: Spacing.md },
  statRow: { flexDirection: 'column' },
  statVal: { ...Typography.headlineMd, fontWeight: '700' },
  statLbl: { ...Typography.labelXs, color: Colors.onSurfaceVariant },
  warningBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFF7E6', borderRadius: Radius.lg, padding: 10 },
  warningText: { ...Typography.labelMd, color: '#F59E0B', flex: 1 },
  descCard: { backgroundColor: Colors.surfaceContainerLowest, borderRadius: Radius.xl, padding: Spacing.lg, ...Shadow.sm },
  descTitle: { ...Typography.titleSm, color: Colors.onSurface, fontWeight: '700', marginBottom: Spacing.sm },
  descText: { ...Typography.bodyMd, color: Colors.onSurfaceVariant, lineHeight: 22 },
  logSection: { backgroundColor: Colors.surfaceContainerLowest, borderRadius: Radius.xl, padding: Spacing.lg, ...Shadow.sm, gap: Spacing.md },
  logTitle: { ...Typography.titleSm, color: Colors.onSurface, fontWeight: '700' },
  logRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.xs, borderBottomWidth: 1, borderBottomColor: Colors.surfaceContainerLow },
  logDot: { width: 10, height: 10, borderRadius: 5, flexShrink: 0 },
  logInfo: { flex: 1 },
  logDate: { ...Typography.labelMd, color: Colors.onSurface, fontWeight: '500' },
  logStatus: { ...Typography.labelXs, fontWeight: '600' },
});
