/**
 * SmartAttend — Admin Route Group Layout
 * Protected: only admin can access this group.
 * Bottom nav: Home, Users, Timetable, Attendance, More
 */
import { Redirect, Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../auth/AuthProvider';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

export default function AdminLayout() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated || !user) return <Redirect href="/login" />;
  if (user.role !== 'admin') {
    if (user.role === 'student') return <Redirect href="/(student)" />;
    if (user.role === 'faculty') return <Redirect href="/(faculty)" />;
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primaryContainer,
        tabBarInactiveTintColor: Colors.onSurfaceVariant,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="timetable"
        options={{
          title: 'Timetable',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'clipboard' : 'clipboard-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'grid' : 'grid-outline'} size={22} color={color} />
          ),
        }}
      />
      {/* Hidden admin sub-screens */}
      <Tabs.Screen name="students" options={{ href: null }} />
      <Tabs.Screen name="student-setup" options={{ href: null }} />
      <Tabs.Screen name="student-profile" options={{ href: null }} />
      <Tabs.Screen name="faculty" options={{ href: null }} />
      <Tabs.Screen name="bulk-update" options={{ href: null }} />
      <Tabs.Screen name="academic-master" options={{ href: null }} />
      <Tabs.Screen name="timetable-import" options={{ href: null }} />
      <Tabs.Screen name="publish-timetable" options={{ href: null }} />
      <Tabs.Screen name="audit-logs" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
      <Tabs.Screen name="reports" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopWidth: 0, height: 72, paddingBottom: 10, paddingTop: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06, shadowRadius: 12, elevation: 8,
  },
  tabLabel: { ...Typography.labelXs, marginTop: 2 },
  tabItem: { paddingVertical: 2 },
});
