/**
 * SmartAttend — Session Expired Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/session_expired/code.html
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function SessionExpiredScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>⏱️</Text>
        </View>

        <Text style={styles.title}>Attendance Window Expired</Text>
        <Text style={styles.subtitle}>
          The active attendance collection window for this class session has ended. Student check-ins are currently locked.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>Session Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Class</Text>
            <Text style={styles.val}>Data Structures & Algorithms</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Auto-Closed At</Text>
            <Text style={styles.val}>10:00 AM</Text>
          </View>
        </View>
      </View>

      <View style={styles.btnCol}>
        <Pressable
          style={styles.reopenBtn}
          onPress={() => router.push({ pathname: '/(faculty)/start-attendance', params: { extend: 'true' } })}
        >
          <Text style={styles.reopenBtnText}>⚡ Re-open Window (5 mins)</Text>
        </Pressable>

        <Pressable
          style={styles.reviewBtn}
          onPress={() => router.replace('/(faculty)/attendance-review')}
        >
          <Text style={styles.reviewBtnText}>Proceed to Review & Finalize</Text>
        </Pressable>
      </View>
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
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
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
    padding: 16,
    elevation: 2,
    gap: 10,
  },
  cardHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  val: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  btnCol: {
    gap: 12,
    marginBottom: 16,
  },
  reopenBtn: {
    backgroundColor: '#FEF3C7',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  reopenBtnText: {
    color: '#92400E',
    fontSize: 15,
    fontWeight: '700',
  },
  reviewBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  reviewBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
