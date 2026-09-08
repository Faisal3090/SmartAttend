/**
 * SmartAttend — Today's Timetable (Faculty)
 * Design reference: stitch_smartattend_mobile_app_onboarding/today_s_timetable/code.html
 */
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { MOCK_FACULTY_TIMETABLE } from '../../mocks/mockData';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function FacultyTimetableScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState('Mon');

  const classes = MOCK_FACULTY_TIMETABLE[selectedDay] || [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Faculty Timetable</Text>
      </View>

      {/* Day Selector */}
      <View style={styles.daySelector}>
        {DAYS.map((day) => (
          <Pressable
            key={day}
            style={[styles.dayTab, selectedDay === day && styles.dayTabActive]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[styles.dayTabText, selectedDay === day && styles.dayTabTextActive]}>
              {day}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {classes.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No classes scheduled for {selectedDay}.</Text>
          </View>
        ) : (
          classes.map((cls) => {
            const isOngoing = cls.status === 'ongoing';
            return (
              <View key={cls.id} style={[styles.card, isOngoing && styles.cardOngoing]}>
                <View style={styles.cardHeader}>
                  <Text style={styles.timeText}>{cls.startTime} - {cls.endTime}</Text>
                  <View style={[styles.statusBadge, isOngoing ? styles.badgeOngoing : styles.badgeUpcoming]}>
                    <Text style={[styles.statusBadgeText, isOngoing ? styles.textOngoing : styles.textUpcoming]}>
                      {cls.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text style={styles.subjectText}>{cls.subject}</Text>
                <Text style={styles.metaText}>{cls.section} • {cls.room} • {cls.studentsEnrolled} Students</Text>

                <View style={styles.btnRow}>
                  <Pressable
                    style={styles.detailsBtn}
                    onPress={() => router.push({ pathname: '/(faculty)/class-details', params: { id: cls.id } })}
                  >
                    <Text style={styles.detailsBtnText}>Class Details</Text>
                  </Pressable>

                  <Pressable
                    style={styles.startBtn}
                    onPress={() => router.push({ pathname: '/(faculty)/start-attendance', params: { id: cls.id } })}
                  >
                    <Text style={styles.startBtnText}>Start Session</Text>
                  </Pressable>
                </View>
              </View>
            );
          })
        )}
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
  daySelector: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 8,
  },
  dayTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  dayTabActive: { backgroundColor: Colors.primary },
  dayTabText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  dayTabTextActive: { color: '#FFFFFF' },
  scrollContent: { padding: 16, gap: 14 },
  emptyCard: { padding: 32, alignItems: 'center' },
  emptyText: { fontSize: 14, color: Colors.textSecondary },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    gap: 8,
  },
  cardOngoing: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeOngoing: { backgroundColor: '#DCFCE7' },
  badgeUpcoming: { backgroundColor: '#EEF2FF' },
  statusBadgeText: { fontSize: 11, fontWeight: '700' },
  textOngoing: { color: Colors.success },
  textUpcoming: { color: Colors.primary },
  subjectText: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  metaText: { fontSize: 13, color: Colors.textSecondary },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  detailsBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
  },
  detailsBtnText: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
  startBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  startBtnText: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },
});
