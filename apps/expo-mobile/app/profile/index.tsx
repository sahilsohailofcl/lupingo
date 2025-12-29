import React from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-wolf-bg p-4">
      <Stack.Screen options={{ title: 'Profile' }} />
      <Text className="text-2xl font-bold text-wolf-brown-dark">Profile</Text>
      <Text className="text-wolf-brown mt-2">Your wolf pack profile and stats.</Text>
      {/* TODO: Add profile info */}
    </View>
  );
}