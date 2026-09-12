import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../auth/AuthProvider';
import { DeviceCrypto } from '../../services/deviceCrypto';
import { completeDeviceRegistration, startDeviceRegistration } from '../../services/api';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Radius, Shadow, Spacing } from '../../constants/spacing';

type RegistrationState = 'working' | 'success' | 'error';

export default function DeviceRegistrationScreen() {
  const router = useRouter();
  const { user, tokens } = useAuth();
  const [state, setState] = useState<RegistrationState>('working');
  const [status, setStatus] = useState('Preparing Android Keystore...');
  const [error, setError] = useState('');
  const pulse = useRef(new Animated.Value(1)).current;

  const register = async () => {
    if (!tokens?.accessToken || !user) {
      throw new Error('Your student session is unavailable. Please sign in again.');
    }

    setState('working');
    setError('');
    setStatus('Preparing Android Keystore...');

    const publicKey = await DeviceCrypto.getOrCreateDevicePublicKey();
    setStatus('Requesting a one-time registration challenge...');
    const challenge = await startDeviceRegistration(tokens.accessToken, publicKey);

    setStatus('Signing the challenge with this device key...');
    const signature = await DeviceCrypto.signRegistrationPayload(
      challenge.challengeId,
      challenge.challenge,
      challenge.studentId,
      challenge.publicKey,
      challenge.expiresAt,
    );

    setStatus('Waiting for backend confirmation...');
    await completeDeviceRegistration(tokens.accessToken, {
      challengeId: challenge.challengeId,
      challenge: challenge.challenge,
      publicKey: challenge.publicKey,
      signature,
    });

    setState('success');
    setStatus('Device registered successfully');
    setTimeout(() => router.replace('/(student)/registration-success'), 500);
  };

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.35, duration: 900, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, easing: Easing.in(Easing.ease), useNativeDriver: true }),
      ]),
    );
    animation.start();

    let mounted = true;
    register().catch((registrationError) => {
      if (!mounted) return;
      setState('error');
      setError(registrationError instanceof Error ? registrationError.message : 'Device registration failed');
      setStatus('Registration was not completed');
    });

    return () => {
      mounted = false;
      animation.stop();
    };
  }, []);

  const isError = state === 'error';
  const isSuccess = state === 'success';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={28} color={Colors.primary} />
        <Text style={styles.headerTitle}>Secure Device Registration</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.heroIconWrap}>
          {!isError && (
            <Animated.View style={[styles.pingRing, { transform: [{ scale: pulse }] }]} />
          )}
          <View style={[styles.heroIconCircle, isError && styles.errorCircle]}>
            <Ionicons
              name={isError ? 'close' : isSuccess ? 'checkmark' : 'phone-portrait-outline'}
              size={42}
              color={isError ? Colors.error : isSuccess ? Colors.success : Colors.tertiary}
            />
          </View>
        </View>

        <Text style={styles.statusTitle}>
          {isError ? 'Registration failed' : isSuccess ? 'Device securely linked' : 'Registering your device...'}
        </Text>
        <Text style={styles.statusDesc}>
          {isError ? error : 'The server will confirm the registration only after this device proves possession of its Keystore private key.'}
        </Text>

        <View style={styles.progressWrap}>
          {!isSuccess && !isError && <ActivityIndicator size="large" color={Colors.primaryContainer} />}
          <View style={styles.progressPill}>
            <View style={[styles.progressDot, { backgroundColor: isError ? Colors.error : Colors.primaryContainer }]} />
            <Text style={styles.progressText}>{status}</Text>
          </View>
        </View>

        {isError && (
          <Pressable style={styles.retryButton} onPress={() => register().catch((e) => {
            setState('error');
            setError(e instanceof Error ? e.message : 'Device registration failed');
          })}>
            <Text style={styles.retryText}>TRY AGAIN</Text>
          </Pressable>
        )}

        <View style={styles.securityCard}>
          <Ionicons name="lock-closed" size={20} color={Colors.tertiary} />
          <Text style={styles.securityText}>The private key stays inside Android Keystore. Only the public key and proof signature leave this device.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surface },
  header: { height: 56, flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingHorizontal: Spacing.marginMobile, backgroundColor: Colors.surfaceContainerLowest, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.outlineVariant, ...Shadow.sm },
  headerTitle: { ...Typography.titleSm, color: Colors.onSurface },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.marginMobile, gap: Spacing.xl },
  heroIconWrap: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  pingRing: { position: 'absolute', width: 116, height: 116, borderRadius: Radius.full, backgroundColor: `${Colors.tertiaryFixed}55` },
  heroIconCircle: { width: 84, height: 84, borderRadius: Radius.full, backgroundColor: Colors.tertiaryFixed, alignItems: 'center', justifyContent: 'center', ...Shadow.sm },
  errorCircle: { backgroundColor: Colors.errorContainer },
  statusTitle: { ...Typography.headlineMd, color: Colors.onSurface, textAlign: 'center' },
  statusDesc: { ...Typography.bodyMd, color: Colors.onSurfaceVariant, textAlign: 'center', maxWidth: 320, lineHeight: 24 },
  progressWrap: { alignItems: 'center', gap: Spacing.md, minHeight: 74 },
  progressPill: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, backgroundColor: Colors.surfaceContainerHigh, borderRadius: Radius.full, paddingHorizontal: Spacing.md, paddingVertical: 8 },
  progressDot: { width: 8, height: 8, borderRadius: Radius.full },
  progressText: { ...Typography.labelMd, color: Colors.primary, fontWeight: '500' },
  retryButton: { height: 48, minWidth: 150, alignItems: 'center', justifyContent: 'center', borderRadius: Radius.md, backgroundColor: Colors.primaryContainer },
  retryText: { ...Typography.labelLg, color: Colors.onPrimary, letterSpacing: 1 },
  securityCard: { width: '100%', backgroundColor: `${Colors.tertiaryFixed}99`, borderRadius: Radius.xl, padding: Spacing.md, flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, ...Shadow.sm },
  securityText: { ...Typography.bodySm, color: Colors.onSurfaceVariant, flex: 1, lineHeight: 19 },
});
