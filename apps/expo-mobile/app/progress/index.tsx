import React from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function ProgressScreen() {
  return (
    <View className="flex-1 bg-wolf-bg p-4">
      <Stack.Screen options={{ title: 'Progress' }} />
      <Text className="text-2xl font-bold text-wolf-brown-dark">Progress</Text>
      <Text className="text-wolf-brown mt-2">Track your digital detox journey.</Text>
      {/* TODO: Add progress charts */}
    </View>
  );
}