'use client';

import React from 'react';

/**
 * Client wrapper to ensure TailwindProvider context is available
 * for dynamically imported components
 */
export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

