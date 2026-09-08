/**
 * SmartAttend — Manage / Edit Class Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/manage_edit_class/code.html
 */
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function ManageClassScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [subjectName, setSubjectName] = useState('Data Structures & Algorithms');
  const [subjectCode, setSubjectCode] = useState('CS301');
  const [room, setRoom] = useState('LHC-101');
  const [time, setTime] = useState('09:00 AM - 10:00 AM');
  const [gracePeriod, setGracePeriod] = useState('10 minutes');

  const handleSave = () => {
    Alert.alert('Class Updated', 'Class configuration saved successfully.');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>Cancel</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Manage Class Settings</Text>
        <Pressable onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject Name</Text>
          <TextInput
            style={styles.input}
            value={subjectName}
            onChangeText={setSubjectName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject Code</Text>
          <TextInput
            style={styles.input}
            value={subjectCode}
            onChangeText={setSubjectCode}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Assigned Classroom / Hall</Text>
          <TextInput
            style={styles.input}
            value={room}
            onChangeText={setRoom}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Time Slot</Text>
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Attendance Grace Period</Text>
          <TextInput
            style={styles.input}
            value={gracePeriod}
            onChangeText={setGracePeriod}
          />
        </View>

        <Pressable style={styles.dangerBtn} onPress={() => Alert.alert('Cancel Class', 'Class session has been cancelled.')}>
          <Text style={styles.dangerBtnText}>Cancel Today's Class Session</Text>
        </Pressable>
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
    color: Colors.textSecondary,
    fontSize: 15,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  saveText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  dangerBtn: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  dangerBtnText: {
    color: Colors.error,
    fontWeight: '700',
    fontSize: 14,
  },
});
