/**
 * SmartAttend — Start Attendance Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/start_attendance/code.html
 */
import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function StartAttendanceScreen() {
  const router = useRouter();
  const { tokens } = useAuth();

  const [duration, setDuration] = useState(15);
  const [requireGeofence, setRequireGeofence] = useState(true);
  const [requireBLE, setRequireBLE] = useState(true);

  const handleStartSession = async () => {
    try {
      if (!tokens?.accessToken) {
        throw new Error('No authentication token available');
      }

      console.log(
        'START SESSION TOKEN:',
        `${tokens.accessToken.substring(0, 20)}...`
      );

      const response = await fetch(
        'http://192.168.1.3:5000/api/attendance/sessions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
          body: JSON.stringify({
            classId: 2,
          }),
        }
      );

      const result = await response.json();

      console.log('START SESSION STATUS:', response.status);
      console.log('START SESSION RESPONSE:', result);

      if (response.status === 409 && result.data?.id) {
        console.log('Rejoining active attendance session:', result.data.id);
        router.replace({
          pathname: '/(faculty)/ble-session',
          params: {
            durationMinutes: duration.toString(),
            sessionId: result.data.id.toString(),
            broadcastToken: result.data.broadcastToken || 'ACTIVE_SESSION_TOKEN',
          },
        });
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Failed to create attendance session'
        );
      }

      const sessionId = result.data.id;
      const broadcastToken = result.data.broadcastToken;
      if (!broadcastToken) {
        throw new Error('Attendance session did not return a BLE token');
      }

      router.replace({
        pathname: '/(faculty)/ble-session',
        params: {
          durationMinutes: duration.toString(),
          sessionId: sessionId.toString(),
          broadcastToken,
        },
      });
    } catch (error) {
      console.error('START SESSION ERROR:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Configure Session</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Structures & Algorithms</Text>
          <Text style={styles.cardSub}>LHC-101 • Section A • 45 Students</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Duration</Text>
          <View style={styles.durationRow}>
            {[5, 10, 15, 20, 30].map((mins) => (
              <Pressable
                key={mins}
                style={[styles.durationChip, duration === mins && styles.durationChipActive]}
                onPress={() => setDuration(mins)}
              >
                <Text style={[styles.durationText, duration === mins && styles.durationTextActive]}>
                  {mins} min
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Validation Security</Text>

          <Pressable
            style={styles.toggleRow}
            onPress={() => setRequireBLE(!requireBLE)}
          >
            <View style={styles.toggleTextCol}>
              <Text style={styles.toggleTitle}>BLE Beacon Broadcasting</Text>
              <Text style={styles.toggleDesc}>Broadcast Bluetooth low-energy packet from device</Text>
            </View>
            <Text style={styles.toggleIcon}>{requireBLE ? '🟢 ON' : '⚪ OFF'}</Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={styles.toggleRow}
            onPress={() => setRequireGeofence(!requireGeofence)}
          >
            <View style={styles.toggleTextCol}>
              <Text style={styles.toggleTitle}>GPS Classroom Geofence</Text>
              <Text style={styles.toggleDesc}>Enforce 20-meter GPS radius from LHC-101</Text>
            </View>
            <Text style={styles.toggleIcon}>{requireGeofence ? '🟢 ON' : '⚪ OFF'}</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Pressable style={styles.startBtn} onPress={handleStartSession}>
        <Text style={styles.startBtnText}>Start Live Attendance Window</Text>
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
    gap: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  cardSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  durationRow: {
    flexDirection: 'row',
    gap: 10,
  },
  durationChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
  },
  durationChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  durationTextActive: {
    color: '#FFFFFF',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
  },
  toggleTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  toggleDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  toggleIcon: {
    fontSize: 13,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  startBtn: {
    backgroundColor: Colors.success,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 16,
    elevation: 4,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
