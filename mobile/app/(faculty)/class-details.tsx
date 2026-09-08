/**
 * SmartAttend — Faculty Class Details Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/class_details/code.html
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { mockFacultyClasses } from '../../mocks/mockData';

export default function ClassDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const classId = (params.id as string) || 'cls-1';
  const cls = mockFacultyClasses.find((c) => c.id === classId) || mockFacultyClasses[0];

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Class Details</Text>
        <Pressable onPress={() => router.push({ pathname: '/(faculty)/manage-class', params: { id: cls.id } })}>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner Card */}
        <View style={styles.bannerCard}>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>CS301</Text>
          </View>
          <Text style={styles.subjectTitle}>{cls.subject}</Text>
          <Text style={styles.metaSub}>Computer Science • Sem 5</Text>

          <View style={styles.statsBar}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{cls.studentsEnrolled}</Text>
              <Text style={styles.statLabel}>Enrolled</Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.statBox}>
              <Text style={[styles.statNum, { color: Colors.success }]}>
                88%
              </Text>
              <Text style={styles.statLabel}>Avg Attendance</Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{cls.startTime}</Text>
              <Text style={styles.statLabel}>Time Slot</Text>
            </View>
          </View>
        </View>

        {/* Info Grid */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Schedule & Venue</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Classroom Venue</Text>
            <Text style={styles.infoVal}>{cls.room}</Text>
          </View>
          <View style={styles.hDivider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Time Window</Text>
            <Text style={styles.infoVal}>{cls.startTime} - {cls.endTime}</Text>
          </View>
          <View style={styles.hDivider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={[styles.statusTag, cls.status === 'ongoing' ? styles.tagActive : styles.tagUpcoming]}>
              <Text style={[styles.statusText, cls.status === 'ongoing' ? styles.textActive : styles.textUpcoming]}>
                {cls.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Controls */}
        <View style={styles.actionSection}>
          <Pressable
            style={styles.startBtn}
            onPress={() => router.push({ pathname: '/(faculty)/start-attendance', params: { id: cls.id } })}
          >
            <Text style={styles.startBtnText}>🚀 Start Attendance Session</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryBtn}
            onPress={() => router.push({ pathname: '/(faculty)/attendance-review', params: { id: cls.id } })}
          >
            <Text style={styles.secondaryBtnText}>📋 View Previous Attendance Log</Text>
          </Pressable>
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
  editText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  bannerCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
  },
  codeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  codeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  subjectTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  metaSub: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  vDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoVal: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  hDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagActive: {
    backgroundColor: '#DCFCE7',
  },
  tagUpcoming: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  textActive: {
    color: Colors.success,
  },
  textUpcoming: {
    color: Colors.warning,
  },
  actionSection: {
    gap: 12,
    marginTop: 8,
  },
  startBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
});
