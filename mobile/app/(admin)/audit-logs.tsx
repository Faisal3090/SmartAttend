/**
 * SmartAttend — Admin System Audit Logs Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/audit_logs/code.html
 */
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { mockAuditLogs } from '../../mocks/mockData';

export default function AuditLogsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>System Audit Logs</Text>
        <View style={{ width: 60 }} />
      </View>

      <FlatList
        data={mockAuditLogs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.actionText}>{item.action}</Text>
              <Text style={styles.timeText}>{item.timestamp}</Text>
            </View>

            <Text style={styles.userText}>Performed by: {item.user}</Text>
            <Text style={styles.detailsText}>{item.description}</Text>
          </View>
        )}
      />
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
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  userText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 2,
  },
  detailsText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
