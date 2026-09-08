/**
 * SmartAttend — Admin Student Profile & Device Management Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/student_profile_device/code.html
 */
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { mockStudents } from '../../mocks/mockData';

export default function AdminStudentProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const usn = (params.usn as string) || '01CS123';
  const student = mockStudents.find((s) => s.usn === usn) || mockStudents[0];

  const [isBound, setIsBound] = useState(student.deviceBound);

  const handleUnbind = () => {
    Alert.alert(
      'Unbind Device?',
      `Are you sure you want to unbind the device from ${student.name}? The student will be prompted to re-bind a device on next login.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unbind Device',
          style: 'destructive',
          onPress: () => {
            setIsBound(false);
            Alert.alert('Device Unbound', 'Hardware binding has been reset.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Student Hardware Audit</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Banner */}
        <View style={styles.banner}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.usn}>{student.usn} • {student.department}</Text>
        </View>

        {/* Device Status Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hardware Binding Info</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Binding Status</Text>
            <View style={[styles.badge, isBound ? styles.badgeSuccess : styles.badgeWarning]}>
              <Text style={[styles.badgeText, isBound ? styles.textSuccess : styles.textWarning]}>
                {isBound ? 'Active Lock' : 'No Device Bound'}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Device Model</Text>
            <Text style={styles.val}>{isBound ? (student.boundDeviceName || 'Galaxy S21 Ultra') : 'N/A'}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Hardware UUID</Text>
            <Text style={styles.val}>{isBound ? '8F3A-991A-204B-7F1C' : 'Unregistered'}</Text>
          </View>

          {isBound && (
            <Pressable style={styles.unbindBtn} onPress={handleUnbind}>
              <Text style={styles.unbindBtnText}>🔓 Reset & Unbind Hardware Lock</Text>
            </Pressable>
          )}
        </View>

        {/* Academic Profile */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Academic Records</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Overall Attendance Rate</Text>
            <Text style={[styles.val, { color: Colors.success, fontWeight: '800' }]}>{student.attendancePercentage}%</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Semester</Text>
            <Text style={styles.val}>Semester {student.semester}</Text>
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
  banner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  usn: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeSuccess: {
    backgroundColor: '#DCFCE7',
  },
  badgeWarning: {
    backgroundColor: '#FEF3C7',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textSuccess: {
    color: Colors.success,
  },
  textWarning: {
    color: Colors.warning,
  },
  unbindBtn: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  unbindBtnText: {
    color: Colors.error,
    fontWeight: '700',
    fontSize: 14,
  },
});
