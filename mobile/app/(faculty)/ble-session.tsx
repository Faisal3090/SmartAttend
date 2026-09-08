/**
 * SmartAttend — BLE Session Active Screen
 */

import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../auth/AuthProvider';
import { BLEService } from '../../services/ble';

const API_BASE_URL = 'http://192.168.6.213:5000/api';

export default function BleSessionActiveScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const { tokens } = useAuth();

  const sessionId = params.sessionId as string | undefined;

  const durationMinutes = parseInt(
    (params.durationMinutes as string) || '15',
    10
  );

  const initialDuration = durationMinutes * 60;

  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [ending, setEnding] = useState(false);

  useEffect(() => {
  let mounted = true;

  const startBle = async () => {
    if (!sessionId) {
      console.error('BLE ERROR: Missing session ID');
      return;
    }

    try {
      console.log(
        'SmartAttend BLE: Requesting Bluetooth permissions...'
      );

      await BLEService.requestPermissions();

      if (!mounted) return;

      console.log(
        'SmartAttend BLE: Starting teacher broadcast'
      );
      console.log(
        'SmartAttend BLE: Session ID =',
        sessionId
      );

      BLEService.startTeacherBroadcast(sessionId);

      console.log(
        'SmartAttend BLE: Teacher broadcast started successfully'
      );
    } catch (error) {
      console.error(
        'SmartAttend BLE START ERROR:',
        error
      );
    }
  };

  startBle();

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => {
    mounted = false;

    clearInterval(timer);

    console.log(
      'SmartAttend BLE: Stopping teacher broadcast'
    );

    BLEService.stopTeacherBroadcast();
  };
}, [sessionId]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;

    return `${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  const handleEndSession = async () => {
    if (!sessionId) {
      console.error('END SESSION ERROR: Missing session ID');
      router.replace('/(faculty)/attendance-review');
      return;
    }

    if (!tokens?.accessToken) {
      console.error('END SESSION ERROR: No authentication token');
      return;
    }

    try {
      setEnding(true);

      const response = await fetch(
        `${API_BASE_URL}/attendance/sessions/${sessionId}/finalize`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        }
      );

      const result = await response.json();

      console.log('FINALIZE SESSION STATUS:', response.status);
      console.log('FINALIZE SESSION RESPONSE:', result);

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Failed to finalize attendance session'
        );
      }

      console.log('GOING TO REVIEW WITH SESSION ID:', sessionId);
      
      BLEService.stopTeacherBroadcast();
      
      router.replace({
  pathname: '/(faculty)/attendance-review',
  params: {
    sessionId: String(sessionId),
  },
});

    } catch (error) {
      console.error('END SESSION ERROR:', error);
      setEnding(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.radarRing}>
          <Text style={styles.bleIcon}>📶</Text>

          <Text style={styles.broadcastingText}>
            Broadcasting BLE Signal
          </Text>

          {sessionId && (
            <Text style={styles.sessionText}>
              Session ID: {sessionId}
            </Text>
          )}
        </View>

        <Text style={styles.timerDisplay}>
          {formatTime(timeLeft)}
        </Text>

        <Text style={styles.timerSub}>
          Time Remaining in Attendance Window
        </Text>

        <View style={styles.card}>
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>
              Attendance Session Active
            </Text>

            <Text style={styles.statusText}>
              Students can now detect this attendance session through BLE.
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.liveBtn}
          onPress={() =>
            router.push({
              pathname: '/(faculty)/live-participation',
              params: {
                sessionId: String(sessionId),
              },
            })
          }
        >
          <Text style={styles.liveBtnText}>
            👁 View Live Student Roster
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={[
          styles.stopBtn,
          ending && styles.stopBtnDisabled,
        ]}
        disabled={ending}
        onPress={handleEndSession}
      >
        <Text style={styles.stopBtnText}>
          {ending
            ? 'Finalizing Attendance...'
            : 'End Session & Review Attendance'}
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

  radarRing: {
    alignItems: 'center',
    marginBottom: 24,
  },

  bleIcon: {
    fontSize: 54,
    marginBottom: 8,
  },

  broadcastingText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  sessionText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  timerDisplay: {
    fontSize: 56,
    fontWeight: '900',
    color: Colors.textPrimary,
  },

  timerSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 32,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  statusBox: {
    alignItems: 'center',
  },

  statusTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 8,
  },

  statusText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },

  liveBtn: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },

  liveBtnText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },

  stopBtn: {
    backgroundColor: Colors.error,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },

  stopBtnDisabled: {
    opacity: 0.6,
  },

  stopBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});