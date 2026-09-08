/**
 * SmartAttend — Admin System Settings Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/system_settings/code.html
 */
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function SystemSettingsScreen() {
  const router = useRouter();

  const [strictBinding, setStrictBinding] = useState(true);
  const [geofenceRadius, setGeofenceRadius] = useState('20 meters');
  const [bleTxPower, setBleTxPower] = useState('High (+4 dBm)');
  const [sessionTimeout, setSessionTimeout] = useState('15 minutes');

  const handleSave = () => {
    Alert.alert('Settings Saved', 'Global system security rules have been updated.');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>Cancel</Text>
        </Pressable>
        <Text style={styles.headerTitle}>System Settings</Text>
        <Pressable onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security & Binding Enforcement</Text>

          <Pressable
            style={styles.settingRow}
            onPress={() => setStrictBinding(!strictBinding)}
          >
            <View style={styles.textCol}>
              <Text style={styles.settingTitle}>Enforce 1-Student 1-Device Lock</Text>
              <Text style={styles.settingDesc}>
                Prevent attendance marking if hardware ID does not match binding database.
              </Text>
            </View>
            <Text style={styles.statusPill}>{strictBinding ? '🟢 ACTIVE' : '⚪ DISABLED'}</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Classroom Geofencing</Text>

          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={styles.settingTitle}>GPS Geofence Radius</Text>
              <Text style={styles.settingDesc}>Maximum allowable distance from beacon</Text>
            </View>
            <Text style={styles.valText}>{geofenceRadius}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BLE Beacon Parameters</Text>

          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={styles.settingTitle}>BLE Transmission Power</Text>
              <Text style={styles.settingDesc}>Controls signal coverage range</Text>
            </View>
            <Text style={styles.valText}>{bleTxPower}</Text>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.textCol}>
              <Text style={styles.settingTitle}>Default Window Duration</Text>
              <Text style={styles.settingDesc}>Default active attendance window for faculty</Text>
            </View>
            <Text style={styles.valText}>{sessionTimeout}</Text>
          </View>
        </View>
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
    gap: 20,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    elevation: 1,
  },
  textCol: {
    flex: 1,
    paddingRight: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  settingDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statusPill: {
    fontSize: 12,
    fontWeight: '700',
  },
  valText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});
