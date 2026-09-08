/**
 * SmartAttend — Attendance Reminder / Home Attendance Ongoing Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/home_attendance_ongoing/code.html
 *
 * Shows active attendance window banner with countdown
 */
import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { SmartAttendLogo } from '../../assets/SmartAttendLogo';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Radius, Shadow, Spacing } from '../../constants/spacing';
import { MOCK_STUDENT, MOCK_STUDENT_SESSION } from '../../mocks/mockData';

export default function AttendanceReminderScreen() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(847); // seconds

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progress = timeLeft / 900;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <SmartAttendLogo size={32} />
          <View>
            <Text style={styles.headerBrand}>SmartAttend</Text>
            <Text style={styles.headerTitle}>Student Home</Text>
          </View>
        </View>
        <Pressable onPress={() => router.push('/(student)/notifications')}>
          <View style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={22} color={Colors.onSurface} />
            <View style={styles.notifDot} />
          </View>
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backRow} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.onSurface} />
        </Pressable>

        {/* Active Attendance Banner */}
        <View style={styles.activeBanner}>
          <View style={styles.bannerTop}>
            <View style={styles.bannerIcon}>
              <Ionicons name="radio-button-on" size={20} color="#16A34A" />
            </View>
            <Text style={styles.bannerLabel}>ATTENDANCE WINDOW OPEN</Text>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.livePillText}>LIVE</Text>
            </View>
          </View>

          <Text style={styles.bannerSubject}>{MOCK_STUDENT_SESSION.nextClass.subject}</Text>
          <Text style={styles.bannerMeta}>
            {MOCK_STUDENT_SESSION.nextClass.section} · {MOCK_STUDENT_SESSION.nextClass.room}
          </Text>

          {/* Countdown */}
          <View style={styles.countdown}>
            <View style={styles.countdownTime}>
              <Text style={styles.countdownNum}>{String(mins).padStart(2, '0')}</Text>
              <Text style={styles.countdownSep}>:</Text>
              <Text style={styles.countdownNum}>{String(secs).padStart(2, '0')}</Text>
            </View>
            <Text style={styles.countdownLabel}>minutes remaining to mark attendance</Text>
          </View>

          {/* Progress bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` as any }]} />
          </View>

          <Pressable style={styles.markBtn} onPress={() => router.push('/(student)/attendance-check')}>
            <Ionicons name="finger-print-outline" size={20} color={Colors.onPrimary} />
            <Text style={styles.markBtnText}>MARK MY ATTENDANCE</Text>
          </Pressable>
        </View>

        {/* Class Info card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Class Details</Text>
          {[
            { icon: 'book-outline', label: 'Subject', value: MOCK_STUDENT_SESSION.nextClass.subject },
            { icon: 'people-outline', label: 'Section', value: MOCK_STUDENT_SESSION.nextClass.section },
            { icon: 'business-outline', label: 'Room', value: MOCK_STUDENT_SESSION.nextClass.room },
            { icon: 'time-outline', label: 'Time', value: `${MOCK_STUDENT_SESSION.nextClass.startTime} – ${MOCK_STUDENT_SESSION.nextClass.endTime}` },
            { icon: 'person-outline', label: 'Faculty', value: MOCK_STUDENT_SESSION.nextClass.faculty },
          ].map((row) => (
            <View key={row.label} style={styles.infoRow}>
              <View style={styles.infoIconWrap}>
                <Ionicons name={row.icon as any} size={16} color={Colors.primaryContainer} />
              </View>
              <Text style={styles.infoLabel}>{row.label}</Text>
              <Text style={styles.infoValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Note */}
        <View style={styles.noteCard}>
          <Ionicons name="shield-checkmark-outline" size={18} color="#5B3FD3" />
          <Text style={styles.noteText}>
            Your device must be registered and location enabled for BLE proximity verification.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface },
  header: { height: 64, paddingHorizontal: Spacing.marginMobile, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.surfaceContainerLowest, borderBottomWidth: 1, borderBottomColor: Colors.outlineVariant },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  headerBrand: { ...Typography.labelMd, color: Colors.primaryContainer, fontWeight: '600' },
  headerTitle: { ...Typography.titleSm, color: Colors.onSurface },
  notifBtn: { position: 'relative', width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  notifDot: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.error },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.marginMobile, paddingBottom: 32, gap: Spacing.lg },
  backRow: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginLeft: -6, marginTop: Spacing.sm },
  activeBanner: { backgroundColor: '#EAF8ED', borderRadius: Radius.xl, padding: Spacing.lg, borderWidth: 1.5, borderColor: '#A7F3D0', gap: Spacing.md },
  bannerTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  bannerIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(22,163,74,0.1)', alignItems: 'center', justifyContent: 'center' },
  bannerLabel: { ...Typography.labelMd, color: '#16A34A', fontWeight: '700', flex: 1, letterSpacing: 0.5 },
  livePill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#16A34A', borderRadius: 100, paddingHorizontal: 8, paddingVertical: 3 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'white' },
  livePillText: { ...Typography.labelXs, color: 'white', fontWeight: '700' },
  bannerSubject: { ...Typography.headlineMd, color: Colors.onSurface, fontWeight: '700' },
  bannerMeta: { ...Typography.bodyMd, color: Colors.onSurfaceVariant },
  countdown: { alignItems: 'center', gap: 4, paddingVertical: Spacing.sm },
  countdownTime: { flexDirection: 'row', alignItems: 'center' },
  countdownNum: { fontSize: 48, fontWeight: '700', color: '#16A34A', fontFamily: 'Inter_700Bold' },
  countdownSep: { fontSize: 40, fontWeight: '700', color: '#16A34A', marginHorizontal: 4 },
  countdownLabel: { ...Typography.bodySm, color: Colors.onSurfaceVariant },
  progressTrack: { height: 6, backgroundColor: 'rgba(22,163,74,0.2)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#16A34A', borderRadius: 3 },
  markBtn: { height: 52, backgroundColor: '#16A34A', borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, ...Shadow.md },
  markBtnText: { ...Typography.labelLg, color: Colors.onPrimary, letterSpacing: 0.8 },
  infoCard: { backgroundColor: Colors.surfaceContainerLowest, borderRadius: Radius.xl, padding: Spacing.lg, ...Shadow.sm, gap: Spacing.sm },
  infoTitle: { ...Typography.titleSm, color: Colors.onSurface, fontWeight: '700', marginBottom: Spacing.xs },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: Colors.surfaceContainerLow },
  infoIconWrap: { width: 28, height: 28, borderRadius: 8, backgroundColor: Colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { ...Typography.labelMd, color: Colors.onSurfaceVariant, width: 60 },
  infoValue: { ...Typography.bodyMd, color: Colors.onSurface, fontWeight: '500', flex: 1 },
  noteCard: { backgroundColor: '#F1EDFF', borderRadius: Radius.lg, padding: Spacing.md, flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-start' },
  noteText: { ...Typography.bodySm, color: Colors.onSurface, flex: 1, lineHeight: 18 },
});
