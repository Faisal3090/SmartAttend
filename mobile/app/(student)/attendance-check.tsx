import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../auth/AuthProvider';
import { BLEService } from '../../services/ble';
import { DeviceCrypto } from '../../services/deviceCrypto';
import { completeAttendanceChallenge, startAttendanceChallenge } from '../../services/api';

export default function AttendanceCheckScreen() {
  const router = useRouter();
  const { tokens } = useAuth();
  const [status, setStatus] = useState('Requesting Bluetooth permission...');
  const [error, setError] = useState<string | null>(null);
  const processing = useRef(false);
  const subscription = useRef<{ remove: () => void } | null>(null);

  useEffect(() => {
    let mounted = true;
    const fail = (message: string) => {
      if (!mounted) return;
      setError(message);
      setStatus('Attendance verification failed');
    };
    const verifyDetectedSession = async (sessionToken: string) => {
      if (processing.current || !tokens?.accessToken) return;
      processing.current = true;
      BLEService.stopStudentScanning();
      subscription.current?.remove();
      subscription.current = null;
      try {
        setStatus('Validating the attendance session...');
        const challenge = await startAttendanceChallenge(tokens.accessToken, sessionToken);
        if (!mounted) return;
        setStatus('Signing the one-time challenge with native secure key storage...');
        const signature = await DeviceCrypto.signAttendancePayload(
          challenge.challengeId,
          challenge.challenge,
          challenge.sessionId,
          challenge.studentId,
          challenge.deviceId,
          challenge.publicKey,
          challenge.expiresAt,
        );
        setStatus('Submitting cryptographic attendance proof...');
        await completeAttendanceChallenge(tokens.accessToken, {
          challengeId: challenge.challengeId,
          challenge: challenge.challenge,
          signature,
        });
        if (!mounted) return;
        router.replace({ pathname: '/(student)/attendance-marked', params: { sessionId: String(challenge.sessionId) } });
      } catch (cause) {
        fail(cause instanceof Error ? cause.message : 'Unable to record attendance');
      }
    };
    const start = async () => {
      try {
        if (!tokens?.accessToken) throw new Error('Authentication is required');
        const granted = await BLEService.requestPermissions();
        if (!mounted) return;

        if (granted) {
          setStatus('Scanning for the faculty attendance beacon...');
          subscription.current = BLEService.startStudentScanning((data) => {
            void verifyDetectedSession(data.id);
          });
        } else {
          throw new Error('Bluetooth permission is required. Attendance cannot be verified without the faculty BLE session token.');
        }
      } catch (cause) {
        fail(cause instanceof Error ? cause.message : 'Unable to start BLE scanning');
      }
    };
    void start();
    return () => {
      mounted = false;
      BLEService.stopStudentScanning();
      subscription.current?.remove();
      subscription.current = null;
    };
  }, [router, tokens?.accessToken]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>◉</Text>
        <Text style={styles.title}>Secure Attendance Check</Text>
        <Text style={styles.status}>{status}</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.note}>Attendance is confirmed only after the server verifies this device's native secure-key signature.</Text>
      </View>
      <Pressable style={styles.cancel} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 24, alignItems: 'center', elevation: 2 },
  icon: { fontSize: 48, color: Colors.primary, marginBottom: 18 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  status: { fontSize: 15, color: Colors.primary, textAlign: 'center', marginTop: 18, lineHeight: 22 },
  error: { fontSize: 14, color: Colors.error, textAlign: 'center', marginTop: 14 },
  note: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', marginTop: 22, lineHeight: 20 },
  cancel: { padding: 16, alignItems: 'center', marginTop: 18 },
  cancelText: { color: Colors.error, fontSize: 15, fontWeight: '600' },
});
