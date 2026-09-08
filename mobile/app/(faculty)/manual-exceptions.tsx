/**
 * SmartAttend — Manual Exceptions Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/manual_exceptions/code.html
 */
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function ManualExceptionsScreen() {
  const router = useRouter();

  const [exceptions, setExceptions] = useState([
    {
      id: 'exc-1',
      studentUsn: '01CS103',
      studentName: 'Bhavya Patel',
      reason: 'Bluetooth RSSI Weak (-92 dBm)',
      status: 'Pending',
    },
    {
      id: 'exc-2',
      studentUsn: '01CS105',
      studentName: 'Deepika Padukone',
      reason: 'Outside GPS Geofence Range (45m)',
      status: 'Pending',
    },
  ]);

  const handleAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setExceptions((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    Alert.alert('Updated', `Exception request marked as ${newStatus}.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Manual Exception Override</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {exceptions.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.studentName.charAt(0)}</Text>
              </View>
              <View style={styles.headerTextCol}>
                <Text style={styles.studentName}>{item.studentName}</Text>
                <Text style={styles.studentUsn}>{item.studentUsn}</Text>
              </View>
              <View
                style={[
                  styles.statusTag,
                  item.status === 'Approved'
                    ? styles.tagSuccess
                    : item.status === 'Rejected'
                    ? styles.tagError
                    : styles.tagWarning,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    item.status === 'Approved'
                      ? styles.textSuccess
                      : item.status === 'Rejected'
                      ? styles.textError
                      : styles.textWarning,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            <View style={styles.reasonBox}>
              <Text style={styles.reasonLabel}>Verification Flag:</Text>
              <Text style={styles.reasonText}>{item.reason}</Text>
            </View>

            {item.status === 'Pending' && (
              <View style={styles.btnRow}>
                <Pressable
                  style={styles.approveBtn}
                  onPress={() => handleAction(item.id, 'Approved')}
                >
                  <Text style={styles.approveBtnText}>Mark Present</Text>
                </Pressable>

                <Pressable
                  style={styles.rejectBtn}
                  onPress={() => handleAction(item.id, 'Rejected')}
                >
                  <Text style={styles.rejectBtnText}>Keep Absent</Text>
                </Pressable>
              </View>
            )}
          </View>
        ))}
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  headerTextCol: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  studentUsn: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagWarning: {
    backgroundColor: '#FEF3C7',
  },
  tagSuccess: {
    backgroundColor: '#DCFCE7',
  },
  tagError: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textWarning: {
    color: Colors.warning,
  },
  textSuccess: {
    color: Colors.success,
  },
  textError: {
    color: Colors.error,
  },
  reasonBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  reasonLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: 2,
  },
  reasonText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  approveBtn: {
    flex: 1,
    backgroundColor: Colors.success,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  approveBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  rejectBtnText: {
    color: Colors.textPrimary,
    fontWeight: '600',
    fontSize: 13,
  },
});
