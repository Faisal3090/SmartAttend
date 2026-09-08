/**
 * SmartAttend — Timetable Management Screen (Admin)
 * Design reference: stitch_smartattend_mobile_app_onboarding/timetable_management/code.html
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { MOCK_MANAGED_TIMETABLE } from '../../mocks/mockData';

export default function AdminTimetableScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Timetable Management</Text>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={styles.importBtn} onPress={() => router.push('/(admin)/timetable-import')}>
          <Text style={styles.importBtnText}>📁 Import CSV Batch</Text>
        </Pressable>

        <Pressable style={styles.publishBtn} onPress={() => router.push('/(admin)/publish-timetable')}>
          <Text style={styles.publishBtnText}>📢 Broadcast Schedule</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionHeader}>Master Schedule Slots</Text>

        {MOCK_MANAGED_TIMETABLE.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.dayText}>{item.day} • {item.startTime} - {item.endTime}</Text>
              <View style={[styles.statusBadge, item.status === 'published' ? styles.badgeSuccess : styles.badgeWarning]}>
                <Text style={[styles.statusText, item.status === 'published' ? styles.textSuccess : styles.textWarning]}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={styles.subjectTitle}>{item.subject}</Text>
            <Text style={styles.subText}>{item.subjectCode} • {item.section} • {item.room}</Text>

            <Text style={styles.facultyText}>Assigned Faculty: {item.faculty}</Text>
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
  actionRow: { flexDirection: 'row', padding: 16, gap: 10 },
  importBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  importBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  publishBtn: {
    flex: 1,
    backgroundColor: Colors.success,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  publishBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 24, gap: 12 },
  sectionHeader: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    gap: 6,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dayText: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeSuccess: { backgroundColor: '#DCFCE7' },
  badgeWarning: { backgroundColor: '#FEF3C7' },
  statusText: { fontSize: 11, fontWeight: '700' },
  textSuccess: { color: Colors.success },
  textWarning: { color: Colors.warning },
  subjectTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  subText: { fontSize: 12, color: Colors.textSecondary },
  facultyText: { fontSize: 12, fontWeight: '600', color: Colors.primary, marginTop: 4 },
});
