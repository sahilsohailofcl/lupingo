'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// We are using a client component, so we use a regular Link/usePathname
// Icons from Lucide are still used
import { Home, Zap, Leaf, Target, Settings, Menu, X } from 'lucide-react';
import { createPageUrl } from '@foclupus/utils';
import type { PageKey } from '@foclupus/utils';
import { motion } from 'framer-motion';

// ------------------------------------------------
// 1. Bottom Navigation Data (from original Layout)
// ------------------------------------------------
const navItems: Array<{ page: PageKey; name: string; icon: any }> = [
  { page: 'Home', name: 'Home', icon: Home },
  { page: 'FocusMode', name: 'Focus', icon: Zap },
  { page: 'DetoxPath', name: 'Detox', icon: Leaf },
  { page: 'Habits', name: 'Habits', icon: Target },
  { page: 'Profile', name: 'Me', icon: Settings },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Logic to determine active state
  const isActive = (pageKey: PageKey) => {
    // Check if the current path starts with the page's URL
    const url = createPageUrl(pageKey);
    if (pageKey === 'Home') return pathname === '/';
    return pathname.startsWith(url);
  };
  
  // Prevent layout rendering on pages that should be full-screen (e.g., Onboarding, Landing)
  const hideLayout = pathname.startsWith('/onboarding') || pathname.startsWith('/landing') || pathname.startsWith('/focus-mode');

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfcf2]">
      {/* ------------------------------------------------ */}
      {/* 2. Top Header (Migrated from original Layout.js) */}
      {/* ------------------------------------------------ */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#e8d5c4] shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={createPageUrl('Home')} className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-wolf-red rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">W</span>
            </div> 
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold wolf-text-gradient">Foclupus</h1>
              <p className="text-xs text-[#8b7355]">The Focused Wolf</p>
            </div>
          </Link>
          {/* Menu/Settings link could go here */}
        </div>
      </header>

      {/* ------------------------------------------------ */}
      {/* 3. Main Content Area */}
      {/* ------------------------------------------------ */}
      {/* Padding top for the fixed header, padding bottom for the fixed nav */}
      <main className="flex-1 pt-16 pb-20 overflow-auto">
        {children}
      </main>

      {/* ------------------------------------------------ */}
      {/* 4. Bottom Navigation (Migrated from original Layout.js) */}
      {/* ------------------------------------------------ */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8d5c4] shadow-lg z-10">
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.page);
              return (
                // Use Next.js Link instead of react-router-dom's Link
                <Link
                  key={item.page}
                  href={createPageUrl(item.page)}
                  className={`relative flex flex-col items-center py-3 px-4 transition-all ${
                    active
                      ? 'text-[#b22d15]' // Active color
                      : 'text-[#8b7355] hover:text-[#de8538]'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-1 ${active ? 'fill-[#b22d15]' : ''}`} />
                  <span className="text-xs font-medium">{item.name}</span>
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 h-[3px] w-full bg-[#b22d15] rounded-t-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}