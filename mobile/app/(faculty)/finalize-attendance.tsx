/**
 * SmartAttend — Finalize Attendance Screen
 */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../auth/AuthProvider';

const API_BASE_URL = 'http://192.168.6.213:5000/api';

type Participant = {
  studentId: number;
  registerNumber: string;
  name: string;
  email: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  source: string | null;
  attendanceId: number | null;
};

export default function FinalizeAttendanceScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { tokens } = useAuth();

  const sessionId = params.sessionId as string | undefined;

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFinalAttendance = async () => {
      if (!sessionId || !tokens?.accessToken) {
        setError('Session information is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/attendance/sessions/${sessionId}/participants`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          },
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || 'Failed to load final attendance',
          );
        }

        setParticipants(result.data.participants || []);
      } catch (err) {
        console.error('FINAL ATTENDANCE ERROR:', err);

        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load final attendance',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFinalAttendance();
  }, [sessionId, tokens?.accessToken]);

  const presentCount = participants.filter(
    (student) => student.status === 'PRESENT',
  ).length;

  const absentCount = participants.filter(
    (student) => student.status === 'ABSENT',
  ).length;

  const lateCount = participants.filter(
    (student) => student.status === 'LATE',
  ).length;

  const totalCount = participants.length;

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>
          Loading final attendance...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.errorText}>{error}</Text>

        <Pressable
          style={styles.homeBtn}
          onPress={() => router.replace('/(faculty)')}
        >
          <Text style={styles.homeBtnText}>
            Return to Faculty Dashboard
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkCircle}>
          <Text style={styles.icon}>🔒</Text>
        </View>

        <Text style={styles.title}>
          Ledger Locked & Finalized
        </Text>

        <Text style={styles.subtitle}>
          The attendance session has been permanently recorded
          and finalized successfully.
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Session ID</Text>
            <Text style={styles.val}>#{sessionId}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Total Students</Text>
            <Text style={styles.val}>{totalCount}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Present Count</Text>
            <Text
              style={[
                styles.val,
                { color: Colors.success },
              ]}
            >
              {presentCount} / {totalCount}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Absent Count</Text>
            <Text
              style={[
                styles.val,
                { color: Colors.error },
              ]}
            >
              {absentCount} / {totalCount}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Late Count</Text>
            <Text
              style={[
                styles.val,
                { color: Colors.warning },
              ]}
            >
              {lateCount} / {totalCount}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        style={styles.homeBtn}
        onPress={() => router.replace('/(faculty)')}
      >
        <Text style={styles.homeBtnText}>
          Return to Faculty Dashboard
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

  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#DCFCE7',
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
    padding: 20,
    elevation: 2,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  label: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  val: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },

  homeBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },

  homeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  loadingText: {
    marginTop: 12,
    color: Colors.textSecondary,
  },

  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 20,
  },
});