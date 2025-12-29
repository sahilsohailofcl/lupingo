'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Flame, Wind, Heart, Sun, Play, CheckCircle2, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK API Clients/Components ---
// Placeholder for external API calls (replace with actual logic)
const base44 = {
  entities: {
    UserProfile: {
      list: async () => [{ id: 'user-123', xp: 100 }], // Mock user profile
      update: async (id: string, data: any) => console.log(`[API MOCK] Updated Profile ${id} with:`, data),
    },
    MindfulnessSession: {
      create: async (data: any) => console.log(`[API MOCK] Created Session:`, data),
    },
  },
};

// Placeholder for external UI components
const SectionHeader = ({ title, icon: Icon }: { title: string, icon: React.FC<any> }) => (
  <header className="text-center space-y-2">
    <Icon className="w-10 h-10 text-wolf-red mx-auto fill-wolf-red/10" />
    <h1 className="text-3xl font-extrabold text-wolf-brown-dark">{title}</h1>
  </header>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-3xl border-2 border-wolf-border shadow-lg ${className}`}>
    {children}
  </div>
);

const WolfButton = ({ children, onClick, disabled, className }: { children: React.ReactNode, onClick: () => void, disabled?: boolean, className?: string }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`wolf-gradient px-6 py-3 text-white rounded-xl font-bold shadow-md transition-opacity hover:opacity-90 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
  >
    {children}
  </button>
);

const Link = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => (
  <a href={href} className={className}>{children}</a>
);

// --- Session Entity & Data ---
interface MindfulnessSession {
  type: string;
  title: string;
  description: string;
  icon: React.FC<any>;
  duration: number; // minutes
  xp: number;
  color: string; // Tailwind gradient classes
}

const SESSIONS: MindfulnessSession[] = [
  {
    type: 'breathing',
    title: 'Box Breathing',
    description: '4-4-4-4 pattern for instant calm (5 min cycle)',
    icon: Wind,
    duration: 5,
    xp: 15,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    type: 'meditation',
    title: 'Quick Meditation',
    description: 'A moment of stillness and awareness',
    icon: Play,
    duration: 10,
    xp: 25,
    color: 'from-purple-500 to-pink-500',
  },
  {
    type: 'gratitude',
    title: 'Gratitude Practice',
    description: 'Reflect on three things you\'re grateful for',
    icon: Heart,
    duration: 3,
    xp: 10,
    color: 'from-pink-500 to-rose-500',
  },
  {
    type: 'clarity_check',
    title: 'Clarity Check-In',
    description: 'Pause and assess your current mental state',
    icon: Sun,
    duration: 5,
    xp: 10,
    color: 'from-amber-500 to-orange-500',
  },
];

// --- XP Celebration Modal (Placeholder) ---
const XPCelebration = ({ xp, onComplete }: { xp: number, onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 3000); // Auto-close after 3 seconds
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.5, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="bg-white rounded-3xl p-10 text-center shadow-2xl relative border-4 border-wolf-gold"
            >
                <Flame className="w-20 h-20 text-wolf-gold mx-auto mb-4 fill-wolf-gold animate-bounce" />
                <h3 className="text-4xl font-black text-wolf-brown-dark mb-2">XP Earned!</h3>
                <p className="text-wolf-brown-light text-xl mb-6">
                    You gained <span className="text-wolf-red font-extrabold">+{xp} XP</span> for finding your focus.
                </p>
                <WolfButton onClick={onComplete}>
                    Awesome!
                </WolfButton>
            </motion.div>
        </motion.div>
    );
};
// --- END MOCK COMPONENTS ---


// ------------------------------------------------
// 1. Main Mindfulness Page Component
// ------------------------------------------------

export default function MindfulnessPage() {
  const queryClient = useQueryClient();
  const [selectedSession, setSelectedSession] = useState<MindfulnessSession | null>(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const [showXP, setShowXP] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  // Fetch user profile for XP updates (mocks the second file's logic)
  const { data: profiles = [] } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => base44.entities.UserProfile.list(),
  });

  const completeMindfulnessMutation = useMutation({
    mutationFn: async (session: MindfulnessSession) => {
      // 1. Log the session completion
      await base44.entities.MindfulnessSession.create({
        session_type: session.type,
        duration_minutes: session.duration,
        xp_earned: session.xp,
        completed: true,
      });

      // 2. Update user XP
      const profile = profiles[0];
      if (profile) {
        await base44.entities.UserProfile.update(profile.id, {
          xp: (profile.xp || 0) + session.xp,
        });
      }
      
      return session.xp;
    },
    onSuccess: (xp) => {
      setEarnedXP(xp);
      setShowXP(true);
      setSessionActive(false);
      setSelectedSession(null);
      setBreathCount(0);
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });

  const startSession = (session: MindfulnessSession) => {
    setSelectedSession(session);
    setSessionActive(true);
    if (session.type === 'breathing') {
      setBreathCount(0);
    }
  };

  const completeSession = () => {
    if (selectedSession) {
        completeMindfulnessMutation.mutate(selectedSession);
    }
  };

// --- RENDER BOX BREATHING SESSION ---
  const renderBreathingSession = (session: MindfulnessSession) => {
    const maxBreaths = 5; // Simplified max breaths for quick demo
    const progress = (breathCount / maxBreaths) * 100;

    return (
      <div className="text-center space-y-8 p-4">
        <h2 className="text-2xl font-bold text-wolf-brown-dark">{session.title}</h2>
        
        {/* Breathing Animation Visual */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1.3, 1, 1],
            borderColor: ['#a5f3fc', '#06b6d4', '#06b6d4', '#a5f3fc', '#a5f3fc'],
          }}
          transition={{
            duration: 16, // 4s in, 4s hold, 4s out, 4s hold = 16s cycle
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
          className="w-40 h-40 mx-auto rounded-full border-8 border-cyan-200 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl"
        >
          <Wind className="w-20 h-20 text-white" />
        </motion.div>
        

[Image of box breathing diagram]


        {/* Counter and Instructions */}
        <div>
          <div className="text-5xl font-bold text-wolf-red mb-2">{breathCount} / {maxBreaths}</div>
          <p className="text-wolf-brown-light">Breathing cycles completed</p>
        </div>

        <div className="space-y-4">
          <div className="w-full h-2 bg-wolf-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
            />
          </div>

          <Card className="bg-blue-50 p-4 text-sm text-wolf-brown-dark text-left">
            <p className="font-semibold mb-2">Instructions:</p>
            <p>• Inhale: **4 seconds**</p>
            <p>• Hold (Full): **4 seconds**</p>
            <p>• Exhale: **4 seconds**</p>
            <p>• Hold (Empty): **4 seconds**</p>
          </Card>

          <WolfButton
            onClick={() => setBreathCount(breathCount + 1)}
            disabled={breathCount >= maxBreaths}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            {breathCount >= maxBreaths ? 'Ready to Finish' : 'Count Next Cycle'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </WolfButton>

          {breathCount >= maxBreaths && (
            <WolfButton
              onClick={completeSession}
              className="w-full h-12 bg-green-600 hover:bg-green-700 mt-2"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Claim XP & Finish Session
            </WolfButton>
          )}
        </div>
      </div>
    );
  };

// --- RENDER GENERIC SESSION (Meditation, Gratitude, etc.) ---
  const renderGenericSession = (session: MindfulnessSession) => {
    const Icon = session.icon;
    return (
      <div className="text-center space-y-8 p-4">
        <h2 className="text-2xl font-bold text-wolf-brown-dark">{session.title}</h2>
        
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${session.color} flex items-center justify-center shadow-2xl`}
        >
          <Icon className="w-16 h-16 text-white" />
        </motion.div>

        <div>
          <h3 className="text-xl font-bold text-wolf-brown-dark mb-2">
            {session.description}
          </h3>
          <p className="text-wolf-brown-light">⏱️ ~{session.duration} minutes</p>
        </div>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 p-6">
          <p className="text-wolf-brown-dark leading-relaxed">
            **Focus Prompt:** Take this time to be fully present. Close your eyes, take deep, slow breaths, 
            and allow yourself to simply **be**. Whether it's reflecting on gratitude or just being still, 
            let go of judgment for this moment.
          </p>
        </Card>

        <WolfButton
          onClick={completeSession}
          className={`w-full h-12 bg-gradient-to-r ${session.color}`}
          disabled={completeMindfulnessMutation.isPending}
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          {completeMindfulnessMutation.isPending ? 'Claiming XP...' : `Complete & Claim +${session.xp} XP`}
        </WolfButton>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-[#fffaf4] p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
      
      {/* XP Celebration Overlay */}
      <AnimatePresence>
        {showXP && <XPCelebration xp={earnedXP} onComplete={() => setShowXP(false)} />}
      </AnimatePresence>

      <SectionHeader title="Mindfulness & Detoxing" icon={Flame} />

      {/* --- Main Content Switcher --- */}
      <AnimatePresence mode="wait">
        {!sessionActive ? (
          // --- SESSION SELECTION VIEW ---
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 space-y-6">
              <h2 className="text-xl font-bold text-wolf-brown-dark">Choose Your Focus Ritual</h2>
              <p className="text-wolf-brown-light">Select a quick ritual to reset your mind and recenter your focus before deep work.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {SESSIONS.map((session) => {
                  const Icon = session.icon;
                  return (
                    <motion.button
                      key={session.type}
                      whileHover={{ scale: 1.02, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => startSession(session)}
                      className="bg-white rounded-2xl p-6 border-2 border-wolf-border hover:border-wolf-red transition-all text-left"
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${session.color} flex items-center justify-center mb-4 shadow-md`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-bold text-wolf-brown-dark mb-1">{session.title}</h3>
                      <p className="text-sm text-wolf-brown-light mb-3">{session.description}</p>
                      <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                        <span className="text-wolf-brown-light">⏱️ {session.duration} min</span>
                        <span className="font-bold text-wolf-red">+{session.xp} XP</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        ) : (
          // --- ACTIVE SESSION VIEW ---
          <motion.div
            key="active"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 sm:p-8">
              {selectedSession && selectedSession.type === 'breathing' ? (
                renderBreathingSession(selectedSession)
              ) : (
                selectedSession && renderGenericSession(selectedSession)
              )}
              
              <WolfButton
                onClick={() => {
                  setSessionActive(false);
                  setSelectedSession(null);
                  setBreathCount(0);
                }}
                className="w-full mt-6 bg-gray-200 text-wolf-brown-dark hover:bg-gray-300 transition-colors"
              >
                <X className="w-5 h-5 mr-2" />
                Exit Session
              </WolfButton>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer Link */}
      <div className="text-center pt-4">
        <Link href={'/detox-path'} className="text-wolf-red hover:text-wolf-gold font-medium transition-colors">
          Explore the Full Detox Path
        </Link>
      </div>
      
      {/* Global CSS for Wolf colors/gradient */}
      <style>{`
        .wolf-brown-dark { color: #2d1810; }
        .wolf-brown-light { color: #8b7355; }
        .wolf-red { color: #b22d15; }
        .wolf-gold { color: #de8538; }
        .wolf-border { border-color: #e8d5c4; }
        .wolf-gradient {
          background: linear-gradient(135deg, #b22d15, #de8538);
        }
      `}</style>
    </div>
  );
}