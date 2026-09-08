/**
 * SmartAttend — Admin Publish Timetable Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/publish_timetable/code.html
 */
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function PublishTimetableScreen() {
  const router = useRouter();

  const handlePublish = () => {
    Alert.alert('Timetable Published', 'The new master timetable is now active for all students and faculty.');
    router.replace('/(admin)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Publish Master Schedule</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryCard}>
          <Text style={styles.title}>Semester 6 CSE Timetable</Text>
          <Text style={styles.subtitle}>Ready for broadcast to 120 student apps and 6 faculty apps</Text>

          <View style={styles.grid}>
            <View style={styles.gridBox}>
              <Text style={styles.num}>42</Text>
              <Text style={styles.lbl}>Classes</Text>
            </View>
            <View style={styles.gridBox}>
              <Text style={styles.num}>6</Text>
              <Text style={styles.lbl}>Days/Wk</Text>
            </View>
            <View style={styles.gridBox}>
              <Text style={styles.num}>0</Text>
              <Text style={styles.lbl}>Conflicts</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Pressable style={styles.publishBtn} onPress={handlePublish}>
        <Text style={styles.publishBtnText}>📢 Broadcast & Publish Timetable</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
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
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    gap: 10,
  },
  gridBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  num: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  lbl: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  publishBtn: {
    backgroundColor: Colors.success,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 16,
    elevation: 4,
  },
  publishBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
