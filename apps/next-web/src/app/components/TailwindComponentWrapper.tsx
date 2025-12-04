'use client';

import React, { useEffect, useState } from 'react';

/**
 * Wrapper component that provides TailwindProvider context for a single component
 * This is needed because dynamically imported components may not inherit context
 * Dynamically imports provider to avoid server-side resolution.
 */
export function TailwindComponentWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
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

