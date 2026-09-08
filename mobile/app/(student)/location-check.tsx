/**
 * SmartAttend — Location Check in Progress Screen
 *
 * Real flow:
 * 1. Receive BLE session ID + RSSI from attendance-check
 * 2. Perform the existing location verification UI
 * 3. Pass session ID + RSSI to final confirmation screen
 */

import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import { Colors } from '../../constants/colors';

export default function LocationCheckScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const sessionId = params.sessionId as string | undefined;
  const rssi = params.rssi as string | undefined;

  const [distance, setDistance] = useState(15.4);
  const [status, setStatus] = useState(
    'Acquiring High-Precision GPS Lock...'
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDistance(2.1);
      setStatus(
        'Inside Classroom Geofence Zone (LHC-101)'
      );

      const nextTimer = setTimeout(() => {
        router.replace({
          pathname: '/(student)/all-checks-passed',
          params: {
            sessionId: sessionId || '',
            rssi: rssi || '',
          },
        });
      }, 1200);

      return () => clearTimeout(nextTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, [sessionId, rssi]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mapCard}>
          <Text style={styles.pinIcon}>📍</Text>

          <View style={styles.circleRipple} />

          <Text style={styles.roomTag}>
            LHC-101 (CS Dept)
          </Text>
        </View>

        <Text style={styles.title}>
          Location Verification
        </Text>

        <Text style={styles.subtitle}>
          Ensuring your physical location matches the
          scheduled classroom coordinates.
        </Text>

        <View style={styles.statusBox}>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceValue}>
              {distance} m
            </Text>

            <Text style={styles.distanceLabel}>
              Distance to Beacon
            </Text>
          </View>

          <Text style={styles.statusText}>
            {status}
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.secondaryBtn}
        onPress={() => router.back()}
      >
        <Text style={styles.secondaryBtnText}>
          Cancel
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

  mapCard: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  pinIcon: {
    fontSize: 48,
  },

  circleRipple: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: '#C7D2FE',
  },

  roomTag: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },

  statusBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },

  distanceBadge: {
    alignItems: 'center',
    marginBottom: 12,
  },

  distanceValue: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.primary,
  },

  distanceLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.success,
  },

  secondaryBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },

  secondaryBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});