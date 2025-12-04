'use client';

import React from 'react';
import Link from 'next/link';
// Assuming createPageUrl is available via @foclupus/utils
import { createPageUrl } from '@foclupus/utils'; 
import { WolfButton } from '@foclupus/ui';
import { 
  Target, 
  Brain, 
  Zap, 
  TrendingUp, 
  Shield, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Sparkles 
} from 'lucide-react';
// Removed: import { apiClient } from '@foclupus/utils/apiClient';
// Removed: handleGetStarted function

// --- Component Data ---
const features = [
  {
    icon: Target,
    title: 'Focus Sessions',
    description: 'Timed focus sessions with XP rewards to build deep work habits',
  },
  {
    icon: Brain,
    title: 'Dopamine Detox',
    description: 'Progressive lessons to break screen addiction and reclaim your attention',
  },
  {
    icon: Zap,
    title: 'Daily Challenges',
    description: 'Gamified tasks to keep you motivated and on track',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Visualize your growth with detailed stats and insights',
  },
  {
    icon: Shield,
    title: 'Habit Building',
    description: 'Replace doom-scrolling with healthy, meaningful activities',
  },
  {
    icon: Award,
    title: 'Wolf Ranks',
    description: 'Level up from Cub to Alpha as you complete your journey',
  },
];

const benefits = [
  'Reduce screen time by 50% on average',
  'Build focus muscles with proven techniques',
  'Join a pack of focused wolves',
  'Track your transformation in real-time',
  'Unlock achievements and rewards',
  'Science-backed dopamine detox methods',
];
// --- End Component Data ---


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfcf2] to-orange-50">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-8">
          
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full wolf-gradient flex items-center justify-center shadow-lg">
              <Flame className="w-9 h-9 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold wolf-text-gradient">Foclupus</h1>
              <p className="text-sm text-[#8b7355]">The Focused Wolf</p>
            </div>
          </div>

          {/* Headline */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-[#2d1810] leading-tight">
              Turn Screen Time Into <span className="wolf-text-gradient">Growth Time</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#8b7355]">
              Break free from digital distractions. Build laser focus. Level up your life—one session at a time.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <Link href={createPageUrl('Onboarding')}>
              <WolfButton
                size="lg"
                className="wolf-gradient text-white text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </WolfButton>
            </Link>

            <WolfButton 
              variant="secondary" 
              size="lg"
              className="text-lg px-8 py-6 rounded-full transition-all"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </WolfButton>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-6 text-[#8b7355] text-sm pt-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-purple-600 border-2 border-white" />
              </div>
              <span>Join the pack</span>
            </div>
            <span>•</span>
            <span>🔥 Free to start</span>
            <span>•</span>
            <span>⚡ No credit card needed</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-[#2d1810] mb-4">
              Everything You Need to <span className="wolf-text-gradient">Reclaim Your Focus</span>
            </h3>
            <p className="text-lg text-[#8b7355] max-w-2xl mx-auto">
              A complete system designed to help you break free from distractions and build unshakeable focus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-[#e8d5c4] hover:border-[#de8538] transition-all hover:shadow-lg group"
                >
                  <div className="w-14 h-14 rounded-xl wolf-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-[#2d1810] mb-2">{feature.title}</h4>
                  <p className="text-[#8b7355]">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#b22d15] to-[#de8538] rounded-3xl p-12 md:p-16 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Wolves Choose Foclupus
                </h3>
                <p className="text-white/90 text-lg mb-8">
                  Join thousands of focused individuals who've transformed their relationship with technology
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="text-center space-y-6">
                    <Sparkles className="w-16 h-16 mx-auto" />
                    <div>
                      <div className="text-6xl font-bold mb-2">50+</div>
                      <div className="text-white/80">Hours saved per month</div>
                    </div>
                    <div className="pt-6 border-t border-white/20">
                      <div className="text-4xl font-bold mb-2">92%</div>
                      <div className="text-white/80">Report better focus</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-5xl font-bold text-[#2d1810] mb-6">
            Ready to Become the Alpha of Your Life?
          </h3>
          <p className="text-xl text-[#8b7355] mb-8">
            Start your free journey today. No credit card required. Cancel anytime.
          </p>
          
          <Link href={createPageUrl('Onboarding')}>
            <WolfButton
              size="lg"
              className="wolf-gradient text-white text-xl px-12 py-7 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-105 cursor-pointer"
            >
              Get Started Free
              <Flame className="w-6 h-6 ml-2" />
            </WolfButton>
          </Link>

          <p className="text-sm text-[#8b7355] mt-4">
            Join the pack in less than 60 seconds
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2d1810] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full wolf-gradient flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Foclupus</span>
          </div>
          <p className="text-white/60 mb-6">The Focused Wolf</p>
          <p className="text-white/40 text-sm">
            © 2025 Foclupus. Turn screen time into growth time. 🐺
          </p>
        </div>
      </footer>
    </div>
  );
}