/**
 * SmartAttend — Admin Bulk Academic Update Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/bulk_academic_update/code.html
 */
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function BulkAcademicUpdateScreen() {
  const router = useRouter();
  const [selectedDept, setSelectedDept] = useState('Computer Science');
  const [fromSem, setFromSem] = useState('5th Semester');
  const [toSem, setToSem] = useState('6th Semester');

  const handlePromote = () => {
    Alert.alert(
      'Confirm Bulk Promotion',
      `Promote all students in ${selectedDept} from ${fromSem} to ${toSem}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Promote',
          onPress: () => {
            Alert.alert('Bulk Academic Update Completed', '120 students successfully promoted.');
            router.back();
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
        <Text style={styles.headerTitle}>Bulk Academic Update</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Batch Semester Promotion</Text>
          <Text style={styles.cardSub}>
            Bulk update student semester enrolments and clear section rosters for the new academic term.
          </Text>

          <View style={styles.stepBox}>
            <Text style={styles.stepLabel}>1. Select Department</Text>
            <Pressable style={styles.selectBtn}>
              <Text style={styles.selectVal}>{selectedDept}</Text>
            </Pressable>
          </View>

          <View style={styles.stepBox}>
            <Text style={styles.stepLabel}>2. Current Semester</Text>
            <Pressable style={styles.selectBtn}>
              <Text style={styles.selectVal}>{fromSem}</Text>
            </Pressable>
          </View>

          <View style={styles.stepBox}>
            <Text style={styles.stepLabel}>3. Target Semester</Text>
            <Pressable style={styles.selectBtn}>
              <Text style={styles.selectVal}>{toSem}</Text>
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.promoteBtn} onPress={handlePromote}>
          <Text style={styles.promoteBtnText}>🚀 Execute Bulk Semester Promotion</Text>
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
    gap: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    gap: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  cardSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  stepBox: {
    gap: 6,
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  selectBtn: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  selectVal: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  promoteBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
  },
  promoteBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
