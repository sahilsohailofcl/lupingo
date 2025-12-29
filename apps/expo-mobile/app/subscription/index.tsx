import React from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function SubscriptionScreen() {
  return (
    <View className="flex-1 bg-wolf-bg p-4">
      <Stack.Screen options={{ title: 'Subscription' }} />
      <Text className="text-2xl font-bold text-wolf-brown-dark">Subscription</Text>
      <Text className="text-wolf-brown mt-2">Upgrade to premium for advanced features.</Text>
      {/* TODO: Add subscription options */}
    </View>
  );
}