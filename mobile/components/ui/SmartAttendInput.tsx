/**
 * SmartAttend — SmartAttendInput
 * Reusable text input matching Stitch design (with leading icon + optional trailing)
 */
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Radius, Spacing } from '../../constants/spacing';

interface Props extends TextInputProps {
  label?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onTrailingPress?: () => void;
  error?: string;
}

export function SmartAttendInput({
  label,
  leadingIcon,
  trailingIcon,
  onTrailingPress,
  error,
  style,
  ...inputProps
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          focused && styles.focused,
          error ? styles.errorBorder : null,
        ]}
      >
        {leadingIcon && <View style={styles.leadingIcon}>{leadingIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leadingIcon ? styles.inputWithLeading : null,
            trailingIcon ? styles.inputWithTrailing : null,
            style as any,
          ]}
          placeholderTextColor={Colors.outline}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />
        {trailingIcon && (
          <Pressable
            onPress={onTrailingPress}
            style={styles.trailingIcon}
            hitSlop={8}
          >
            {trailingIcon}
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    gap: Spacing.xxs,
  },
  label: {
    ...Typography.labelMd,
    color: Colors.onSurface,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  focused: {
    borderColor: Colors.primaryContainer,
    shadowColor: Colors.primaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    height: '100%',
    ...Typography.bodySm,
    color: Colors.onSurface,
    paddingHorizontal: Spacing.lg,
  },
  inputWithLeading: {
    paddingLeft: 44,
  },
  inputWithTrailing: {
    paddingRight: 44,
  },
  leadingIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
  },
  trailingIcon: {
    position: 'absolute',
    right: 14,
    padding: 4,
    zIndex: 1,
  },
  errorText: {
    ...Typography.labelXs,
    color: Colors.error,
    marginLeft: 4,
  },
});
