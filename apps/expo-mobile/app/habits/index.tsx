import React from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function HabitsScreen() {
  return (
    <View className="flex-1 bg-wolf-bg p-4">
      <Stack.Screen options={{ title: 'Habits' }} />
      <Text className="text-2xl font-bold text-wolf-brown-dark">Habits</Text>
      <Text className="text-wolf-brown mt-2">Build healthy habits for digital wellness.</Text>
      {/* TODO: Add habit list */}
    </View>
  );
}