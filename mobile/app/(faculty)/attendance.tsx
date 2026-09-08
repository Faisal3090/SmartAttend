/**
 * SmartAttend — Faculty Attendance Summary Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/attendance_summary/code.html
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { MOCK_ATTENDANCE_SESSIONS } from '../../mocks/mockData';

export default function FacultyAttendanceScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Attendance Summary</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner Card */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Faculty Overview</Text>
          <View style={styles.bannerGrid}>
            <View style={styles.metric}>
              <Text style={styles.metricVal}>86%</Text>
              <Text style={styles.metricSub}>Avg Attendance</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricVal}>48</Text>
              <Text style={styles.metricSub}>Sessions Held</Text>
            </View>
            <View style={styles.metric}>
              <Text style={[styles.metricVal, { color: Colors.warning }]}>3</Text>
              <Text style={styles.metricSub}>Exceptions</Text>
            </View>
          </View>
        </View>

        {/* Sessions List */}
        <Text style={styles.sectionTitle}>Recent Conducted Sessions</Text>

        {MOCK_ATTENDANCE_SESSIONS.map((session) => (
          <View key={session.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.subjectName}>{session.subject}</Text>
                <Text style={styles.subjectCode}>{session.subjectCode} • {session.section} • {session.room}</Text>
              </View>
              <View style={styles.ratePill}>
                <Text style={styles.rateText}>{session.attendanceRate}%</Text>
              </View>
            </View>

            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${session.attendanceRate}%` }]} />
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Date: {session.date}</Text>
              <Text style={styles.metaLabel}>Present: {session.present} / {session.total}</Text>
            </View>

            <View style={styles.btnRow}>
              <Pressable
                style={styles.reviewBtn}
                onPress={() => router.push({ pathname: '/(faculty)/attendance-review', params: { id: session.id } })}
              >
                <Text style={styles.reviewBtnText}>Review Audit Log</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  appBar: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  appBarTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  scrollContent: { padding: 16, gap: 16 },
  banner: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    padding: 18,
  },
  bannerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },
  bannerGrid: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
  },
  metric: { flex: 1, alignItems: 'center' },
  metricVal: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  metricSub: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    gap: 12,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  subjectName: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  subjectCode: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  ratePill: { backgroundColor: '#DCFCE7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  rateText: { color: Colors.success, fontWeight: '800', fontSize: 13 },
  progressBg: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metaLabel: { fontSize: 12, color: Colors.textSecondary },
  btnRow: { marginTop: 4 },
  reviewBtn: {
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  reviewBtnText: { color: Colors.primary, fontWeight: '700', fontSize: 13 },
});
