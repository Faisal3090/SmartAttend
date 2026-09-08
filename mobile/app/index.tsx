/**
 * SmartAttend — Entry Point / Auth Router
 * Checks authentication state and redirects to appropriate role route.
 * Uses useEffect + useRouter so navigation fires reactively on state change.
 */
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { useAuth } from '../auth/AuthProvider';
import { Colors } from '../constants/colors';

export default function IndexScreen() {
  const { isLoading, isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Wait until session restore is complete

    if (!isAuthenticated || !user) {
      router.replace('/login');
      return;
    }

    // Route by role
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
      default:
        router.replace('/login');
    }
  }, [isLoading, isAuthenticated, user]);

  // Show loading spinner while session restores or navigation is pending
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.primaryContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
