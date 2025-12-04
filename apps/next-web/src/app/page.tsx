 'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect root to the landing page (marketing / welcome screen)
    router.replace('/landing');
  }, [router]);

  return null;
}