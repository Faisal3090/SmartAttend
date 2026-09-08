/**
 * SmartAttend — InfoPanel
 * Informational callout panel matching Stitch login info panel design
 */
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Radius, Spacing } from '../../constants/spacing';

type Variant = 'info' | 'success' | 'warning' | 'error' | 'security';

interface Props {
  title?: string;
  message: string;
  variant?: Variant;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

const VARIANT_STYLES: Record<Variant, { bg: string; titleColor: string; textColor: string }> = {
  info: {
    bg: Colors.surfaceContainerLow,
    titleColor: Colors.onSecondaryContainer,
    textColor: Colors.onSurfaceVariant,
  },
  success: {
    bg: Colors.successContainer,
    titleColor: Colors.success,
    textColor: Colors.onSurface,
  },
  warning: {
    bg: Colors.warningContainer,
    titleColor: Colors.warning,
    textColor: Colors.onSurface,
  },
  error: {
    bg: Colors.errorContainer,
    titleColor: Colors.error,
    textColor: Colors.onErrorContainer,
  },
  security: {
    bg: Colors.tertiaryFixed,
    titleColor: Colors.tertiary,
    textColor: Colors.onSurface,
  },
};

export function InfoPanel({ title, message, variant = 'info', icon, style }: Props) {
  const vs = VARIANT_STYLES[variant];
  return (
    <View style={[styles.panel, { backgroundColor: vs.bg }, style]}>
      {icon && <View style={styles.iconWrap}>{icon}</View>}
      <View style={styles.content}>
        {title && (
          <Text style={[styles.title, { color: vs.titleColor }]}>{title}</Text>
        )}
        <Text style={[styles.message, { color: vs.textColor }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  iconWrap: {
    marginTop: 1,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    gap: 2,
  },
  title: {
    ...Typography.labelMd,
    fontWeight: '600',
  },
  message: {
    ...Typography.bodySm,
    lineHeight: 18,
  },
});
