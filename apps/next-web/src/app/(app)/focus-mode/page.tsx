'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@foclupus/utils/apiClient';
import { createPageUrl } from '@foclupus/utils';
// Importing shared UI components
import { WolfButton, Card } from '@foclupus/ui';
// Importing icons
import { 
  Play, 
  Pause, 
  Square, 
  Zap, 
  ChevronLeft, 
  Award, 
  Lightbulb 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type FocusState = 'idle' | 'running' | 'paused' | 'completed';

const DURATIONS = [
  { value: 10, label: '10 min', xp: 5, color: 'bg-blue-50 border-blue-200 text-blue-700', iconColor: 'text-blue-500' },
  { value: 25, label: '25 min', xp: 15, color: 'bg-orange-50 border-orange-200 text-wolf-brown-dark', iconColor: 'text-orange-500' },
  { value: 45, label: '45 min', xp: 30, color: 'bg-purple-50 border-purple-200 text-purple-700', iconColor: 'text-purple-500' },
  { value: 60, label: '60 min', xp: 50, color: 'bg-green-50 border-green-200 text-green-700', iconColor: 'text-green-500' },
];

export default function FocusModePage() {
  const router = useRouter();
  const [sessionDuration, setSessionDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(sessionDuration);
  const [focusState, setFocusState] = useState<FocusState>('idle');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  // --- Timer Logic ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (focusState === 'running' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [focusState, timeLeft]);

  // Reset timer when duration changes (only if idle)
  useEffect(() => {
    if (focusState === 'idle') {
      setTimeLeft(sessionDuration);
    }
  }, [sessionDuration, focusState]);

  // --- Handlers ---
  const handleStart = () => setFocusState('running');
  const handlePause = () => setFocusState('paused');
  const handleResume = () => setFocusState('running');
  
  const handleStop = () => {
    setFocusState('idle');
    setTimeLeft(sessionDuration);
  };

  const handleComplete = useCallback(async () => {
    setFocusState('completed');
    const durationMinutes = sessionDuration / 60;
    // Calculate XP based on the selected duration config
    const earned = DURATIONS.find(d => d.value === durationMinutes)?.xp || 10;
    setXpEarned(earned);

    try {
      await apiClient.entities.FocusSession.create({
        duration_minutes: durationMinutes,
        completed: true,
        xp_earned: earned,
        completed_at: new Date().toISOString(),
      });
      setShowCompletionModal(true);
    } catch (error) {
      console.error('Failed to log session', error);
      // Show modal anyway to reward the user visually
      setShowCompletionModal(true);
    }
  }, [sessionDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress for ring (0 to 100)
  const progressPercent = ((sessionDuration - timeLeft) / sessionDuration) * 100;
  // Calculate circumference for SVG circle
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#fffaf4] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>

      {/* Back Button */}
      <button 
        onClick={() => router.push(createPageUrl('Home'))}
        className="absolute top-6 left-6 flex items-center text-wolf-brown-light hover:text-wolf-brown-dark transition-colors z-10 font-bold"
      >
        <ChevronLeft className="w-5 h-5 mr-1" /> Back
      </button>

      {/* --- Main Content --- */}
      <div className="w-full max-w-lg z-10 flex flex-col items-center space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-wolf-brown-dark">Focus Mode</h1>
          <p className="text-wolf-brown-light">Block distractions. Reclaim your time.</p>
        </div>

        {/* --- Timer / Selection Switch --- */}
        {focusState === 'idle' ? (
          <div className="w-full space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-[#f0e4d7]">
              <div className="flex items-center gap-2 mb-4 text-wolf-brown-dark font-bold">
                <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />
                Choose Duration
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {DURATIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSessionDuration(opt.value * 60)}
                    className={`relative p-4 rounded-2xl border-2 transition-all duration-200 text-left group
                      ${sessionDuration === opt.value * 60 
                        ? 'border-wolf-red bg-orange-50 ring-2 ring-orange-200 ring-offset-1' 
                        : 'border-[#e8d5c4] hover:border-wolf-gold bg-white'
                      }
                    `}
                  >
                    <div className="text-2xl font-extrabold text-wolf-brown-dark mb-1">{opt.label}</div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${opt.iconColor} flex items-center`}>
                      <Zap className="w-3 h-3 mr-1" /> +{opt.xp} XP
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <WolfButton 
              size="lg" 
              className="w-full py-6 text-xl shadow-xl wolf-gradient"
              onClick={handleStart}
            >
              <Play className="w-6 h-6 mr-2 fill-current" /> Start Session
            </WolfButton>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center space-y-10">
            
            {/* Timer Visual */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* SVG Progress Ring */}
              <svg className="absolute w-full h-full -rotate-90 transform" viewBox="0 0 260 260">
                {/* Track */}
                <circle
                  cx="130"
                  cy="130"
                  r={radius}
                  stroke="#f0e4d7"
                  strokeWidth="16"
                  fill="none"
                />
                {/* Progress */}
                <circle
                  cx="130"
                  cy="130"
                  r={radius}
                  stroke="#b22d15" // Wolf Red
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset,
                    transition: 'stroke-dashoffset 1s linear'
                  }}
                />
              </svg>
              
              <div className="text-center z-10">
                <div className="text-6xl font-black text-wolf-brown-dark tracking-tight">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-wolf-brown-light font-medium mt-2 animate-pulse">
                  Stay focused...
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 w-full px-8">
              {focusState === 'running' ? (
                <WolfButton 
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white border-0 py-4 rounded-2xl"
                  onClick={handlePause}
                >
                  <Pause className="w-6 h-6 mr-2 fill-current" /> Pause
                </WolfButton>
              ) : (
                <WolfButton 
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white border-0 py-4 rounded-2xl"
                  onClick={handleResume}
                >
                  <Play className="w-6 h-6 mr-2 fill-current" /> Resume
                </WolfButton>
              )}
              
              <button 
                onClick={handleStop}
                className="p-4 rounded-2xl border-2 border-[#e8d5c4] text-wolf-brown-light hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
              >
                <Square className="w-6 h-6 fill-current" />
              </button>
            </div>
          </div>
        )}

        {/* --- Pro Tips Card --- */}
        <div className="w-full bg-blue-50 rounded-2xl p-5 border border-blue-100 flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-1">Pro Tip</h4>
            <p className="text-sm text-blue-700/80 leading-relaxed">
              Put your phone in another room. Out of sight, out of mind. You'll focus 2x better!
            </p>
          </div>
        </div>

      </div>

      {/* --- Completion Modal --- */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }} 
              animate={{ scale: 1, y: 0 }} 
              className="bg-white w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden"
            >
              {/* Confetti-like decoration */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-wolf-red to-wolf-gold"></div>
              
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-yellow-600" />
              </div>
              
              <h2 className="text-3xl font-black text-wolf-brown-dark mb-2">Awesome!</h2>
              <p className="text-wolf-brown-light mb-6">
                You just reclaimed <span className="font-bold text-wolf-brown-dark">{formatTime(sessionDuration)}</span> of your life.
              </p>
              
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-8">
                <div className="text-sm text-orange-600 font-bold uppercase tracking-wider mb-1">Reward</div>
                <div className="text-4xl font-black text-wolf-red">+{xpEarned} XP</div>
              </div>

              <WolfButton 
                className="w-full py-4 text-lg"
                onClick={() => {
                  setShowCompletionModal(false);
                  router.push(createPageUrl('Home'));
                }}
              >
                Claim Reward
              </WolfButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}