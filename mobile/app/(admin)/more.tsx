/**
 * SmartAttend — Admin More / Utility Center Screen
 */
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../auth/AuthProvider';

export default function AdminMoreScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  const menuItems = [
    { label: 'Reports & Analytics', icon: 'analytics-outline', route: '/(admin)/reports', color: Colors.warning },
    { label: 'System Settings', icon: 'settings-outline', route: '/(admin)/settings', color: Colors.primary },
    { label: 'Security Audit Logs', icon: 'shield-checkmark-outline', route: '/(admin)/audit-logs', color: Colors.tertiary },
    { label: 'Academic Structure Master', icon: 'school-outline', route: '/(admin)/academic-master', color: Colors.success },
    { label: 'Bulk Academic Promotion', icon: 'layers-outline', route: '/(admin)/bulk-update', color: Colors.primary },
    { label: 'Import Timetable Batch', icon: 'cloud-upload-outline', route: '/(admin)/timetable-import', color: Colors.secondary },
    { label: 'Publish Master Schedule', icon: 'megaphone-outline', route: '/(admin)/publish-timetable', color: Colors.success },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>More Admin Modules</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {menuItems.map((item, idx) => (
            <React.Fragment key={item.label}>
              <Pressable
                style={styles.itemRow}
                onPress={() => router.push(item.route as any)}
              >
                <View style={[styles.iconCircle, { backgroundColor: '#F1F5F9' }]}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <Text style={styles.itemText}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
              </Pressable>

              {idx < menuItems.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        <Pressable style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Sign Out (Admin)</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  appBar: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  appBarTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  scrollContent: { padding: 16, gap: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    elevation: 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: { flex: 1, fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  divider: { height: 1, backgroundColor: '#F1F5F9' },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 14,
    paddingVertical: 16,
  },
  logoutText: { color: Colors.error, fontSize: 15, fontWeight: '700' },
});
