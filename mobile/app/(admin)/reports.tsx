/**
 * SmartAttend — Admin Reports & Analytics Screen
 * Design reference: stitch_smartattend_mobile_app_onboarding/reports_analytics/code.html
 */
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { mockReports } from '../../mocks/mockData';

export default function ReportsAnalyticsScreen() {
  const router = useRouter();

  const handleExport = (reportName: string) => {
    Alert.alert('Report Exported', `${reportName} generated and ready for download as PDF/CSV.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Reports & Analytics</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Metric Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Institution Monthly Summary</Text>
          <View style={styles.metricRow}>
            <View style={styles.metric}>
              <Text style={styles.metricVal}>{mockReports.overallAttendanceRate}%</Text>
              <Text style={styles.metricSub}>Avg Attendance</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricVal}>{mockReports.totalSessionsConducted}</Text>
              <Text style={styles.metricSub}>Sessions Run</Text>
            </View>
            <View style={styles.metric}>
              <Text style={[styles.metricVal, { color: Colors.warning }]}>{mockReports.flaggedExceptions}</Text>
              <Text style={styles.metricSub}>Exceptions</Text>
            </View>
          </View>
        </View>

        {/* Department Comparison */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Department Attendance Breakdown</Text>

          {mockReports.departmentStats.map((dept, idx) => (
            <View key={idx} style={styles.deptRow}>
              <View style={styles.deptTextCol}>
                <Text style={styles.deptName}>{dept.department}</Text>
                <Text style={styles.deptSub}>{dept.students} Students</Text>
              </View>

              <View style={styles.barCol}>
                <View style={styles.barBg}>
                  <View style={[styles.barFill, { width: `${dept.attendanceRate}%` }]} />
                </View>
                <Text style={styles.rateText}>{dept.attendanceRate}%</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Export Action Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Export Official Records</Text>

          <Pressable style={styles.exportItem} onPress={() => handleExport('Monthly Master Attendance Summary')}>
            <Text style={styles.exportText}>📊 Export Monthly Master Attendance (PDF)</Text>
          </Pressable>

          <Pressable style={styles.exportItem} onPress={() => handleExport('Low Attendance Shortage List (< 75%)')}>
            <Text style={styles.exportText}>⚠️ Export Shortage List (&lt; 75%) (CSV)</Text>
          </Pressable>
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
    gap: 16,
  },
  overviewCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
  },
  metric: {
    flex: 1,
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  metricSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    gap: 14,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  deptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deptTextCol: {
    width: '45%',
  },
  deptName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  deptSub: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  barCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '50%',
  },
  barBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  rateText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    width: 36,
  },
  exportItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  exportText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
