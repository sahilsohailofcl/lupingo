// Must be a client component
'use client'; 

import React from 'react';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';

// Create a client instance outside the component to avoid re-creation on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Optional: Set default stale time (e.g., 5 minutes)
      staleTime: 1000 * 60 * 5, 
    },
  },
});

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}