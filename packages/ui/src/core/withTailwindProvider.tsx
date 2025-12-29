import React, { useEffect, useState } from 'react';
import { TailwindProvider } from 'tailwindcss-react-native';

/**
 * Higher-order component that ensures TailwindProvider context is available
 * for components that use tailwindcss-react-native
 */
export function withTailwindProvider<P extends object>(
  Component: React.ComponentType<P>,
  platform: 'web' | 'native' = 'web'
) {
  return function WrappedComponent(props: P) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return null; // or a loading state
    }

    return (
      <TailwindProvider platform={platform}>
        <Component {...props} />
      </TailwindProvider>
    );
  };
}

