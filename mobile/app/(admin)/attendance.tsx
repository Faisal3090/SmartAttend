/**
 * SmartAttend — Master Attendance Overview Screen (Admin)
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { MOCK_ATTENDANCE_SESSIONS } from '../../mocks/mockData';

export default function AdminAttendanceScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Master Attendance Ledger</Text>
      </View>

      <View style={styles.topBtnBar}>
        <Pressable style={styles.btn} onPress={() => router.push('/(admin)/reports')}>
          <Text style={styles.btnText}>📊 Institution Reports</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => router.push('/(admin)/audit-logs')}>
          <Text style={styles.btnText}>🛡️ Audit Trail</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionHeader}>Live Session Attendance Feed</Text>

        {MOCK_ATTENDANCE_SESSIONS.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.facultyText}>{item.faculty}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <Text style={styles.subjectTitle}>{item.subject} ({item.subjectCode})</Text>
            <Text style={styles.metaSub}>{item.section} • {item.room}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={[styles.statNum, { color: Colors.success }]}>{item.present}</Text>
                <Text style={styles.statLabel}>Present</Text>
              </View>
              <View style={styles.vDivider} />
              <View style={styles.statBox}>
                <Text style={[styles.statNum, { color: Colors.error }]}>{item.absent}</Text>
                <Text style={styles.statLabel}>Absent</Text>
              </View>
              <View style={styles.vDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statNum}>{item.attendanceRate}%</Text>
                <Text style={styles.statLabel}>Turnout</Text>
              </View>
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
  topBtnBar: { flexDirection: 'row', padding: 16, gap: 10 },
  btn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    elevation: 1,
  },
  btnText: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 24, gap: 12 },
  sectionHeader: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    gap: 8,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  facultyText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  dateText: { fontSize: 12, color: Colors.textSecondary },
  subjectTitle: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  metaSub: { fontSize: 12, color: Colors.textSecondary },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 4,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  vDivider: { width: 1, height: 20, backgroundColor: '#CBD5E1' },
});
