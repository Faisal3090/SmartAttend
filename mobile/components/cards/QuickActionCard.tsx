/**
 * SmartAttend — QuickActionCard
 * 2-col or 3-col grid action tile used on all dashboards
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Radius, Shadow, Spacing } from '../../constants/spacing';

interface Props {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  iconBg?: string;
  badge?: number;
  style?: ViewStyle;
  height?: number;
}

export function QuickActionCard({
  icon,
  title,
  subtitle,
  onPress,
  iconBg = Colors.surfaceContainer,
  badge,
  style,
  height = 110,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { height },
        pressed && styles.pressed,
        style,
      ]}
    >
      {badge !== undefined && badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
        </View>
      )}
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>{icon}</View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      {subtitle && (
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    ...Shadow.sm,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.labelLg,
    color: Colors.onSurface,
    flexShrink: 1,
  },
  subtitle: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    minWidth: 20,
    height: 20,
    borderRadius: Radius.full,
    backgroundColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    zIndex: 10,
  },
  badgeText: {
    ...Typography.labelXs,
    color: Colors.onPrimary,
  },
});
