/**
 * SmartAttend — Faculty Profile
 * Faculty has a normal logout button.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Radius, Spacing } from '../../constants/spacing';
import { useAuth } from '../../auth/AuthProvider';
import { MOCK_FACULTY } from '../../mocks/mockData';

export default function FacultyProfileScreen() {
  const { logout } = useAuth();
  const faculty = MOCK_FACULTY;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.appBar}><Text style={styles.appBarTitle}>Profile</Text></View>
      <View style={styles.content}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={Colors.onPrimary} />
          </View>
          <Text style={styles.name}>{faculty.name}</Text>
          <Text style={styles.id}>{faculty.facultyId} • {faculty.department}</Text>
        </View>

        <View style={styles.card}>
          {[
            { label: 'Email', value: faculty.email },
            { label: 'Department', value: faculty.department },
            { label: 'Assigned Courses', value: faculty.subjects.join(', ') },
            { label: 'Status', value: 'ACTIVE' },
          ].map(({ label, value }) => (
            <View key={label} style={styles.row}>
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue} numberOfLines={2}>{value}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  appBar: { height: 64, paddingHorizontal: Spacing.marginMobile, justifyContent: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.outlineVariant, backgroundColor: Colors.surfaceContainerLowest },
  appBarTitle: { ...Typography.titleSm, color: Colors.onSurface },
  content: { flex: 1, paddingHorizontal: Spacing.marginMobile, paddingTop: Spacing['2xl'], gap: Spacing.xl },
  avatarWrap: { alignItems: 'center', gap: Spacing.sm },
  avatar: { width: 80, height: 80, borderRadius: Radius.full, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  name: { ...Typography.headlineMd, color: Colors.onSurface },
  id: { ...Typography.labelMd, color: Colors.onSurfaceVariant },
  card: { backgroundColor: Colors.surfaceContainerLowest, borderRadius: Radius.xl, paddingHorizontal: Spacing.lg },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.outlineVariant },
  rowLabel: { ...Typography.bodyMd, color: Colors.onSurfaceVariant, flex: 1 },
  rowValue: { ...Typography.labelLg, color: Colors.onSurface, flex: 2, textAlign: 'right' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, paddingVertical: Spacing.md, borderRadius: Radius.xl, borderWidth: 1.5, borderColor: Colors.errorContainer },
  logoutText: { ...Typography.labelLg, color: Colors.error },
});
