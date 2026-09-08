/**
 * SmartAttend — Admin Academic Master Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/academic_master/code.html
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function AcademicMasterScreen() {
  const router = useRouter();

  const depts = [
    { name: 'Computer Science & Engineering', code: 'CSE', courses: 24, faculty: 18, students: 480 },
    { name: 'Information Science', code: 'ISE', courses: 18, faculty: 14, students: 360 },
    { name: 'Electronics & Communication', code: 'ECE', courses: 22, faculty: 16, students: 420 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Academic Structure Master</Text>
        <Pressable onPress={() => {}}>
          <Text style={styles.addText}>+ Dept</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {depts.map((d) => (
          <View key={d.code} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.deptCode}>{d.code}</Text>
              <Text style={styles.deptName}>{d.name}</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statNum}>{d.courses}</Text>
                <Text style={styles.statLabel}>Courses</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNum}>{d.faculty}</Text>
                <Text style={styles.statLabel}>Faculty</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNum}>{d.students}</Text>
                <Text style={styles.statLabel}>Students</Text>
              </View>
            </View>
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
  addText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
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
    marginBottom: 16,
  },
  deptCode: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  deptName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 12,
  },
  stat: {
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
});
