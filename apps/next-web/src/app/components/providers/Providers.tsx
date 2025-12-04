'use client';

import React from 'react';
import { QueryClientProvider } from './QueryClientProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      {children}
    </QueryClientProvider>
  );
}

