/**
 * SmartAttend — System Users & Roles Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/system_users_roles/code.html
 */
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { MOCK_SYSTEM_USERS } from '../../mocks/mockData';

export default function AdminUsersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>System Users & Roles</Text>
      </View>

      <View style={styles.navRow}>
        <Pressable style={styles.navBtn} onPress={() => router.push('/(admin)/students')}>
          <Text style={styles.navBtnText}>🎓 Student Roster</Text>
        </Pressable>

        <Pressable style={styles.navBtn} onPress={() => router.push('/(admin)/faculty')}>
          <Text style={styles.navBtnText}>👨‍🏫 Faculty Directory</Text>
        </Pressable>
      </View>

      <FlatList
        data={MOCK_SYSTEM_USERS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.lastLogin}>Last Active: {item.lastLogin}</Text>
            </View>

            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{item.role}</Text>
            </View>
          </View>
        )}
      />
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
  navRow: { flexDirection: 'row', padding: 16, gap: 10 },
  navBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  navBtnText: { color: Colors.primary, fontWeight: '700', fontSize: 13 },
  listContent: { paddingHorizontal: 16, paddingBottom: 24, gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: { fontSize: 18, fontWeight: '800', color: Colors.primary },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  email: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  lastLogin: { fontSize: 11, color: Colors.textSecondary, marginTop: 4 },
  roleBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  roleText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary },
});
