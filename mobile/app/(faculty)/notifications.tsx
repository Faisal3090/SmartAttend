/**
 * SmartAttend — Faculty Notifications Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/faculty_notifications/code.html
 */
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { mockNotifications } from '../../mocks/mockData';

interface NotifItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export default function FacultyNotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotifItem[]>([
    { id: 'fn-1', title: 'Session Warning', message: 'Classroom LHC-101 schedule starts in 10 minutes.', time: '08:50 AM', unread: true },
    { id: 'fn-2', title: 'Device Override Request', message: 'Student Aarav Sharma requested device re-binding.', time: 'Yesterday', unread: false },
    { id: 'fn-3', title: 'Attendance Finalized', message: 'Digital Logic CSE 3A session attendance finalized.', time: '17 May', unread: false },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Faculty Notifications</Text>
        <Pressable onPress={() => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))}>
          <Text style={styles.markAllText}>Read All</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.map((item) => (
          <View key={item.id} style={[styles.card, item.unread && styles.cardUnread]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardTime}>{item.time}</Text>
            </View>
            <Text style={styles.cardBody}>{item.message}</Text>
          </View>
        ))}
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
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  markAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    elevation: 1,
  },
  cardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    backgroundColor: '#F8FAFC',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  cardTime: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  cardBody: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
