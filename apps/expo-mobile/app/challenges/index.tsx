import React from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function ChallengesScreen() {
  return (
    <View className="flex-1 bg-wolf-bg p-4">
      <Stack.Screen options={{ title: 'Challenges' }} />
      <Text className="text-2xl font-bold text-wolf-brown-dark">Challenges</Text>
      <Text className="text-wolf-brown mt-2">Complete challenges to earn XP and level up!</Text>
      {/* TODO: Add challenge list */}
    </View>
  );
}