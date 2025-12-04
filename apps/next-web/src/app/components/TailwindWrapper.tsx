'use client';

import React, { useEffect, useState } from 'react';

/**
 * Wrapper component to ensure TailwindProvider context is available
 * for dynamically imported components that use tailwindcss-react-native
 * Dynamically imports the provider on the client to avoid server-side
 * resolution of `react-native-web` and related DOM-only modules.
 */
export function TailwindWrapper({ children }: { children: React.ReactNode }) {
  const [TailwindProvider, setTailwindProvider] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import('tailwindcss-react-native')
      .then(mod => {
        if (mounted) setTailwindProvider(() => mod.TailwindProvider);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  if (!TailwindProvider) return <>{children}</>;

  const TP = TailwindProvider;
  return <TP platform="web">{children}</TP>;
}

