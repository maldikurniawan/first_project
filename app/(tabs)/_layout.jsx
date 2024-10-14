import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="akun"
        options={{
          title: 'Akun',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name={focused ? "user-alt" : "user"} size={24} color={color} />
          ),
        }}
      />

      {/* Hide Tabs */}
      <Tabs.Screen
        name="chat"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
