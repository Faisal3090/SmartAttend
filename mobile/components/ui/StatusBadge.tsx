/**
 * SmartAttend — StatusBadge
 * Compact pill badge for status indicators
 */
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Radius, Spacing } from '../../constants/spacing';

type Status = 'present' | 'absent' | 'active' | 'expired' | 'pending' | 'info' | 'registered' | 'unregistered' | 'good';

const STATUS_CONFIG: Record<Status, { label: string; bg: string; color: string }> = {
  present:      { label: 'Present',      bg: Colors.successContainer, color: Colors.success },
  absent:       { label: 'Absent',       bg: Colors.errorContainer,   color: Colors.error },
  active:       { label: 'Active',       bg: Colors.successContainer, color: Colors.success },
  expired:      { label: 'Expired',      bg: Colors.warningContainer, color: Colors.warning },
  pending:      { label: 'Pending',      bg: Colors.warningContainer, color: Colors.warning },
  info:         { label: 'Info',         bg: Colors.surfaceContainer, color: Colors.primaryContainer },
  registered:   { label: 'Registered',   bg: Colors.successContainer, color: Colors.success },
  unregistered: { label: 'Unregistered', bg: Colors.warningContainer, color: Colors.warning },
  good:         { label: 'Good',         bg: Colors.primaryFixed,     color: Colors.primary },
};

interface Props {
  status: Status;
  customLabel?: string;
  style?: ViewStyle;
}

export function StatusBadge({ status, customLabel, style }: Props) {
  const cfg = STATUS_CONFIG[status];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }, style]}>
      <Text style={[styles.label, { color: cfg.color }]}>
        {customLabel ?? cfg.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  label: {
    ...Typography.labelXs,
  },
});
