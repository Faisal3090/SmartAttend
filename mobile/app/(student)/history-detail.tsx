/**
 * SmartAttend — Attendance History Detail Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/attendance_history_2/code.html
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function AttendanceHistoryDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const session = {
    id: params.id || 'ATT-849204',
    subjectName: params.subjectName || 'Data Structures & Algorithms',
    subjectCode: params.subjectCode || 'CS301',
    date: params.date || '2026-09-04',
    time: params.time || '09:00 AM - 10:00 AM',
    facultyName: 'Dr. Ramesh Kumar',
    room: 'LHC-101',
    status: (params.status as string) || 'Present',
    beaconRssi: '-64 dBm (Strong)',
    gpsCoords: '12.9716° N, 77.5946° E',
    deviceId: 'SM-G998B (Galaxy S21 Ultra)',
    verificationTime: '09:04:12 AM',
  };

  const isPresent = session.status === 'Present';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Session Audit Log</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Status Card */}
        <View style={[styles.card, isPresent ? styles.cardSuccess : styles.cardAbsent]}>
          <View style={styles.statusRow}>
            <View style={[styles.badge, isPresent ? styles.badgeSuccess : styles.badgeAbsent]}>
              <Text style={[styles.badgeText, isPresent ? styles.badgeTextSuccess : styles.badgeTextAbsent]}>
                {session.status.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.sessionId}>ID: {session.id}</Text>
          </View>
          <Text style={styles.subjectName}>{session.subjectName}</Text>
          <Text style={styles.subjectCode}>{session.subjectCode}</Text>
        </View>

        {/* Details Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Class Information</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.val}>{session.date}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Time Slot</Text>
            <Text style={styles.val}>{session.time}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Faculty</Text>
            <Text style={styles.val}>{session.facultyName}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Room / Venue</Text>
            <Text style={styles.val}>{session.room}</Text>
          </View>
        </View>

        {/* Security & Device Verification */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Technical Verification</Text>

          <View style={styles.row}>
            <Text style={styles.label}>BLE Signal RSSI</Text>
            <Text style={styles.val}>{session.beaconRssi}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>GPS Coordinates</Text>
            <Text style={styles.val}>{session.gpsCoords}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Registered Device</Text>
            <Text style={styles.val}>{session.deviceId}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Timestamp</Text>
            <Text style={styles.val}>{session.verificationTime}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    padding: 8,
  },
  backText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  cardSuccess: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  cardAbsent: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeSuccess: {
    backgroundColor: '#DCFCE7',
  },
  badgeAbsent: {
    backgroundColor: '#FEE2E2',
  },
  badgeText: {
    fontWeight: '800',
    fontSize: 12,
  },
  badgeTextSuccess: {
    color: Colors.success,
  },
  badgeTextAbsent: {
    color: Colors.error,
  },
  sessionId: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  subjectName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subjectCode: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  label: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  val: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});
