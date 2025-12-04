'use client';

import React from 'react';
import { TailwindProvider as NativeTailwindProvider } from 'tailwindcss-react-native';

// Ensure this is a client component that properly provides the context
export function TailwindProvider({ children }: { children: React.ReactNode }) {
  // Use 'web' platform for Next.js
  return (
    <NativeTailwindProvider platform="web">
      {children}
    </NativeTailwindProvider>
  );
}

