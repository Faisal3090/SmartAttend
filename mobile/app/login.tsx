/**
 * SmartAttend — Login Screen
 * Single shared login for Student / Faculty / Admin
 * Design reference: stitch_smartattend_mobile_app_onboarding/smartattend_login/code.html
 *
 * NO role selector. The backend determines role from credentials.
 */
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../auth/AuthProvider';
import { SmartAttendLogo } from '../assets/SmartAttendLogo';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Radius, Shadow, Spacing } from '../constants/spacing';

export default function LoginScreen() {
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // ── Navigate to dashboard when auth state is set ─────────────────────────
  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'student':
          router.replace('/(student)');
          break;
        case 'faculty':
          router.replace('/(faculty)');
          break;
        case 'admin':
          router.replace('/(admin)');
          break;
      }
    }
  }, [isAuthenticated, user]);

  const handleLogin = async () => {
    // Clear previous errors
    setIdentifierError('');
    setPasswordError('');

    // Basic client-side validation
    if (!identifier.trim()) {
      setIdentifierError('Please enter your ID / USN / Faculty ID.');
      return;
    }
    if (!password) {
      setPasswordError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      await login(identifier.trim(), password);
      // useEffect above will handle navigation once auth state updates
    } catch (err: any) {
      Alert.alert(
        'Login Failed',
        err?.message ?? 'Invalid credentials. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Logo & Branding ─────────────────────────────────────────── */}
          <View style={styles.brandSection}>
            <View style={styles.logoContainer}>
              <SmartAttendLogo size={64} />
            </View>

            <View style={styles.brandNameRow}>
              <Text style={styles.brandSmart}>Smart</Text>
              <Text style={styles.brandAttend}>Attend</Text>
            </View>

            <View style={styles.welcomeBlock}>
              <Text style={styles.welcomeTitle}>Welcome!</Text>
              <Text style={styles.welcomeSubtitle}>
                Please login with your credentials to continue.
              </Text>
            </View>
          </View>

          {/* ── Form ────────────────────────────────────────────────────── */}
          <View style={styles.form}>
            {/* Identifier field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>University Identifier</Text>
              <View
                style={[
                  styles.inputContainer,
                  identifierError ? styles.inputError : null,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={Colors.outline}
                  style={styles.leadingIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter USN / Faculty ID / Admin ID"
                  placeholderTextColor={Colors.outline}
                  value={identifier}
                  onChangeText={(t) => { setIdentifier(t); setIdentifierError(''); }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="username"
                  returnKeyType="next"
                  editable={!loading}
                />
              </View>
              {identifierError ? (
                <Text style={styles.errorText}>{identifierError}</Text>
              ) : null}
            </View>

            {/* Password field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View
                style={[
                  styles.inputContainer,
                  passwordError ? styles.inputError : null,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={Colors.outline}
                  style={styles.leadingIcon}
                />
                <TextInput
                  style={[styles.textInput, styles.textInputPassword]}
                  placeholder="Enter Password"
                  placeholderTextColor={Colors.outline}
                  value={password}
                  onChangeText={(t) => { setPassword(t); setPasswordError(''); }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="current-password"
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  editable={!loading}
                />
                <Pressable
                  onPress={() => setShowPassword((v) => !v)}
                  style={styles.trailingIcon}
                  hitSlop={8}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={Colors.outline}
                  />
                </Pressable>
              </View>
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            {/* Forgot Password — applicable for Faculty/Admin */}
            <View style={styles.forgotRow}>
              <Pressable
                onPress={() =>
                  Alert.alert(
                    'Forgot Password',
                    'Please contact your institution administrator to reset your password.',
                    [{ text: 'OK' }]
                  )
                }
                hitSlop={8}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </Pressable>
            </View>

            {/* Login button */}
            <Pressable
              style={({ pressed }) => [
                styles.loginBtn,
                pressed && !loading && styles.loginBtnPressed,
                loading && styles.loginBtnDisabled,
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <>
                  <ActivityIndicator color={Colors.onPrimary} size="small" />
                  <Text style={styles.loginBtnText}>Verifying...</Text>
                </>
              ) : (
                <Text style={styles.loginBtnText}>LOGIN</Text>
              )}
            </Pressable>
          </View>

          {/* ── Info Panel ────────────────────────────────────────────── */}
          <View style={styles.infoPanel}>
            <View style={styles.infoPanelIcon}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={Colors.primaryContainer}
              />
            </View>
            <View style={styles.infoPanelContent}>
              <Text style={styles.infoPanelTitle}>Campus Network Credential</Text>
              <Text style={styles.infoPanelBody}>
                Use the credentials provided by the institution to login.
              </Text>
            </View>
          </View>

          {/* ── Footer ────────────────────────────────────────────────── */}
          <View style={styles.footer}>
            <Ionicons
              name="shield-checkmark-outline"
              size={14}
              color={Colors.outline}
            />
            <Text style={styles.footerText}>UNIFIED INSTITUTIONAL GATEWAY</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
  },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.marginMobile,
    paddingVertical: Spacing.xl,
  },

  // Branding
  brandSection: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  logoContainer: {
    ...Shadow.md,
    borderRadius: 20,
    marginBottom: Spacing.md,
  },
  brandNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  brandSmart: {
    ...Typography.headlineLg,
    color: Colors.onSurface,
  },
  brandAttend: {
    ...Typography.headlineLg,
    color: Colors.primaryContainer,
  },
  welcomeBlock: {
    alignItems: 'center',
    gap: Spacing.xxs,
  },
  welcomeTitle: {
    ...Typography.headlineMd,
    color: Colors.onSurface,
  },
  welcomeSubtitle: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
  },

  // Form
  form: {
    flexDirection: 'column',
    gap: Spacing.md,
    width: '100%',
  },
  fieldGroup: {
    flexDirection: 'column',
    gap: Spacing.xxs,
  },
  fieldLabel: {
    ...Typography.labelMd,
    color: Colors.onSurface,
    fontWeight: '500',
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
    ...Shadow.sm,
  },
  inputError: {
    borderColor: Colors.error,
  },
  leadingIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingLeft: 44,
    paddingRight: Spacing.lg,
    ...Typography.bodySm,
    color: Colors.onSurface,
  },
  textInputPassword: {
    paddingRight: 44,
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

  // Forgot password
  forgotRow: {
    alignItems: 'flex-end',
    marginTop: -4,
  },
  forgotText: {
    ...Typography.labelMd,
    color: Colors.primaryContainer,
    fontWeight: '600',
  },

  // Login button
  loginBtn: {
    height: 48,
    backgroundColor: Colors.primaryContainer,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    ...Shadow.md,
  },
  loginBtnPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  loginBtnDisabled: {
    opacity: 0.7,
  },
  loginBtnText: {
    ...Typography.labelLg,
    color: Colors.onPrimary,
    letterSpacing: 1,
  },

  // Info panel
  infoPanel: {
    marginTop: Spacing['2xl'],
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  infoPanelIcon: {
    marginTop: 1,
  },
  infoPanelContent: {
    flex: 1,
    gap: 2,
  },
  infoPanelTitle: {
    ...Typography.labelMd,
    color: Colors.onSecondaryContainer,
    fontWeight: '600',
  },
  infoPanelBody: {
    ...Typography.bodySm,
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginTop: Spacing['2xl'],
    opacity: 0.7,
  },
  footerText: {
    ...Typography.labelXs,
    color: Colors.outline,
    letterSpacing: 1.5,
  },
});
