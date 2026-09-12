/**
 * SmartAttend — All Checks Passed Ready to Mark Screen
 *
 * Real flow:
 * 1. Receive BLE session ID + RSSI
 * 2. Get logged-in student JWT
 * 3. Submit attendance to backend
 * 4. Backend validates student/session/enrollment/device
 * 5. Navigate to attendance marked screen
 */

import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import { Colors } from '../../constants/colors';
 

export default function AllChecksPassedScreen() {

  const handleSubmitAttendance = () => {
    Alert.alert(
      'Secure verification required',
      'Start from the attendance check screen so the backend can issue and verify a one-time Keystore challenge.',
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIconCircle}>
          <Text style={styles.checkIcon}>✨</Text>
        </View>

        <Text style={styles.title}>
          Ready to Mark Attendance
        </Text>

        <Text style={styles.subtitle}>
          All security and location checks have passed
          successfully. Tap the button below to submit
          your attendance.
        </Text>

        <View style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Subject
            </Text>

            <Text style={styles.detailValue}>
              Data Structures & Algorithms
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Classroom
            </Text>

            <Text style={styles.detailValue}>
              LHC-101
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Faculty
            </Text>

            <Text style={styles.detailValue}>
              Dr. Ramesh Kumar
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Time Window
            </Text>

            <Text style={styles.detailValue}>
              09:00 AM - 10:00 AM
            </Text>
          </View>
        </View>

      </View>

      <Pressable
        style={styles.markBtn}
        onPress={handleSubmitAttendance}
      >
        <Text style={styles.markBtnText}>
          Return to Secure Attendance Check
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
    justifyContent: 'space-between',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  successIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  checkIcon: {
    fontSize: 48,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },

  markBtn: {
    backgroundColor: Colors.success,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
  },

  markBtnDisabled: {
    opacity: 0.6,
  },

  markBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
