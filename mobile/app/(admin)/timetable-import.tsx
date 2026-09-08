/**
 * SmartAttend — Admin Timetable Import Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/timetable_import/code.html
 */
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function TimetableImportScreen() {
  const router = useRouter();
  const [fileName, setFileName] = useState<string | null>(null);

  const handlePickFile = () => {
    setFileName('Semester_6_CSE_Timetable_v2.csv');
  };

  const handleImport = () => {
    if (!fileName) {
      Alert.alert('No File', 'Please select a CSV or Excel timetable file first.');
      return;
    }
    Alert.alert('Import Success', '42 class slots imported. Preview available before publishing.');
    router.push('/(admin)/publish-timetable');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Import Schedule Batch</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable style={styles.dropZone} onPress={handlePickFile}>
          <Text style={styles.dropIcon}>📁</Text>
          <Text style={styles.dropTitle}>
            {fileName ? fileName : 'Tap to Upload CSV / Excel Schedule'}
          </Text>
          <Text style={styles.dropSub}>
            Supports .CSV, .XLSX format with columns: Day, Time, SubjectCode, FacultyID, Room
          </Text>

          <Pressable style={styles.browseBtn} onPress={handlePickFile}>
            <Text style={styles.browseBtnText}>{fileName ? 'Change File' : 'Browse Files'}</Text>
          </Pressable>
        </Pressable>

        {fileName && (
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>File Verified</Text>
            <Text style={styles.previewSub}>42 rows parsed • 0 syntax errors detected</Text>
          </View>
        )}
      </ScrollView>

      <Pressable style={styles.importBtn} onPress={handleImport}>
        <Text style={styles.importBtnText}>Parse & Validate CSV</Text>
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
  dropZone: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    padding: 32,
    alignItems: 'center',
  },
  dropIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  dropTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  dropSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  browseBtn: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  browseBtnText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  previewCard: {
    backgroundColor: '#DCFCE7',
    borderRadius: 14,
    padding: 16,
  },
  previewTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.success,
  },
  previewSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  importBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 16,
    elevation: 4,
  },
  importBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
