/**
 * SmartAttend — Faculty History Screen
 */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { useAuth } from '../../auth/AuthProvider';
import { API_ROOT_URL } from '../../config/api';

const API_BASE_URL = API_ROOT_URL;

type Session = {
  id: number;
  sessionDate?: string;
  startedAt?: string;
  endedAt?: string | null;
  subject?: {
    id: number;
    code: string;
    name: string;
  } | string;
  subjectCode?: string;
  section?: string;
  room?: string;
  present?: number;
  absent?: number;
  late?: number;
  total?: number;
};

export default function FacultyHistoryScreen() {
  const router = useRouter();
  const { tokens } = useAuth();

  const [filter, setFilter] = useState<
    'all' | 'completed' | 'expired'
  >('all');

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    if (!tokens?.accessToken) {
      setError('Authentication token is missing.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `${API_BASE_URL}/faculty/attendance/history`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        },
      );

      const result = await response.json();

      console.log('FACULTY HISTORY STATUS:', response.status);
      console.log('FACULTY HISTORY RESPONSE:', result);

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Failed to load attendance history',
        );
      }

      setSessions(result.data?.sessions || result.data || []);
    } catch (err) {
      console.error('FACULTY HISTORY ERROR:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load attendance history',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [tokens?.accessToken]);

  const filteredSessions = sessions.filter((session) => {
    if (filter === 'completed') {
      return !!session.endedAt;
    }

    if (filter === 'expired') {
      return !session.endedAt;
    }

    return true;
  });

  const formatDate = (date?: string) => {
    if (!date) return 'Unknown date';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString();
  };

  const formatTime = (date?: string) => {
    if (!date) return '';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return '';
    }

    return parsedDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>
          Faculty Session History
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterBar}>
        <Pressable
          style={[
            styles.chip,
            filter === 'all' && styles.chipActive,
          ]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.chipText,
              filter === 'all' && styles.chipTextActive,
            ]}
          >
            All Sessions
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.chip,
            filter === 'completed' && styles.chipActive,
          ]}
          onPress={() => setFilter('completed')}
        >
          <Text
            style={[
              styles.chipText,
              filter === 'completed' && styles.chipTextActive,
            ]}
          >
            Finalized
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.chip,
            filter === 'expired' && styles.chipActive,
          ]}
          onPress={() => setFilter('expired')}
        >
          <Text
            style={[
              styles.chipText,
              filter === 'expired' && styles.chipTextActive,
            ]}
          >
            Expired / Manual
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator
              size="large"
              color={Colors.primary}
            />
            <Text style={styles.loadingText}>
              Loading attendance history...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>

            <Pressable
              style={styles.retryBtn}
              onPress={fetchHistory}
            >
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        ) : filteredSessions.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              No attendance sessions found.
            </Text>
          </View>
        ) : (
          filteredSessions.map((session) => {
            const total = session.total ?? 0;
            const present = session.present ?? 0;

            return (
              <Pressable
                key={session.id}
                style={styles.card}
                onPress={() =>
  router.push({
    pathname: '/(faculty)/attendance-review',
    params: { sessionId: String(session.id) },
  })
}
              >
                <View style={styles.cardTop}>
                  <View
                    style={[
                      styles.badge,
                      session.endedAt
                        ? styles.completedBadge
                        : styles.pendingBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        session.endedAt
                          ? styles.completedText
                          : styles.pendingText,
                      ]}
                    >
                      {session.endedAt
                        ? 'FINALIZED'
                        : 'ACTIVE'}
                    </Text>
                  </View>

                  <Text style={styles.dateText}>
                    {formatDate(session.sessionDate)}{' '}
                    • {formatTime(session.startedAt)}
                  </Text>
                </View>

                <Text style={styles.subjectTitle}>
  {typeof session.subject === 'object'
    ? session.subject.name
    : session.subject || 'Attendance Session'}
</Text>

                <Text style={styles.metaSub}>
  {typeof session.subject === 'object'
    ? `${session.subject.code} • `
    : session.subjectCode
      ? `${session.subjectCode} • `
      : ''}
  {session.section || 'Section not available'}
  {session.room
    ? ` • ${session.room}`
    : ''}
</Text>

                <View style={styles.footerRow}>
                  <Text style={styles.presentText}>
                    Present: {present} / {total}
                  </Text>

                  <Text style={styles.viewDetail}>
                    View Details →
                  </Text>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  appBar: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  appBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  filterBar: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },

  chipActive: {
    backgroundColor: Colors.primary,
  },

  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  chipTextActive: {
    color: '#FFFFFF',
  },

  scrollContent: {
    padding: 16,
    gap: 12,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    gap: 8,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  completedBadge: {
    backgroundColor: '#DCFCE7',
  },

  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },

  completedText: {
    color: Colors.success,
  },

  pendingText: {
    color: Colors.warning,
  },

  dateText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  subjectTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  metaSub: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },

  presentText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  viewDetail: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },

  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },

  loadingText: {
    marginTop: 12,
    color: Colors.textSecondary,
  },

  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },

  retryBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  retryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  emptyText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
