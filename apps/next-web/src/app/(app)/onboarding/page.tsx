'use client'; 

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Target, Brain, Sparkles, TrendingUp, ChevronRight, Home } from 'lucide-react';

// --- MOCK COMPONENTS AND UTILITIES FOR SELF-CONTAINED EXECUTION ---

/**
 * Mock Component: Button
 * Replaces any external Button component.
 */
type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'outline' | string;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, className = '', variant, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-3 font-semibold rounded-xl transition-opacity flex items-center justify-center ${
      variant === 'outline'
        ? 'bg-white border text-[#8b7355] border-[#e8d5c4] hover:bg-[#f9f5f0]'
        : 'text-white ' + className
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
  >
    {children}
  </button>
);

/**
 * Mock Component: Input
 * Replaces any external Input component.
 */
type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({ value, onChange, placeholder = '', className = '' }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full p-3 border-2 focus:outline-none focus:ring-2 rounded-xl text-lg ${className}`}
  />
);

/**
 * Mock Hook: useRouter replacement
 * Simulates navigation by changing the local app status.
 */
const useMockRouter = (setAppStatus: React.Dispatch<React.SetStateAction<string>>) => ({
  push: (url: string) => {
    console.log(`Simulating navigation to: ${url}`);
    setAppStatus('home'); // Change local state to show simulated home page
  }
});

/**
 * Mock Function: createPageUrl replacement
 */
const createPageUrl = (pageName: string) => `/app/${pageName.toLowerCase()}`;

/**
 * Mock API Client Implementation
 * Simulates network latency and API calls.
 */
const apiClient = {
  auth: {
    me: (): Promise<{ id: string }> => new Promise(resolve => {
      // Simulate successful auth check
      setTimeout(() => resolve({ id: 'user-123' }), 50);
    }),
  },
  entities: {
    UserProfile: {
      create: (data: Record<string, any>): Promise<{ success: boolean }> => new Promise(resolve => {
        // Simulate API call delay and success
        console.log("Mock API: Creating UserProfile with data:", data);
        setTimeout(() => resolve({ success: true }), 100);
      }),
    },
  },
};

// --- MAIN ONBOARDING COMPONENT ---

export default function Onboarding() {
  // State to track successful onboarding completion (used instead of router)
  const [appStatus, setAppStatus] = useState('onboarding'); 

  // Initialize mock router (HOOK 1: MUST BE CALLED UNCONDITIONALLY)
  const router = useMockRouter(setAppStatus); 
  
  // All state hooks must be defined before any conditional return
  const [step, setStep] = useState(1); // HOOK 2
  const [wolfName, setWolfName] = useState(''); // HOOK 3
  const [selectedGoal, setSelectedGoal] = useState(''); // HOOK 4
  const [isLoading, setIsLoading] = useState(false); // HOOK 5


  const goals = [
    {
      id: 'reduce_screen_time',
      title: 'Reduce Screen Time',
      icon: Target,
      description: 'Take back control from endless scrolling',
    },
    {
      id: 'build_focus',
      title: 'Build Deep Focus',
      icon: Brain,
      description: 'Train your mind to concentrate longer',
    },
    {
      // FIX 1: Removed the duplicate 'id' property here.
      id: 'dopamine_detox', 
      title: 'Dopamine Detox',
      icon: Sparkles,
      description: 'Reset your brain\'s reward system',
    },
    {
      id: 'mindful_living',
      title: 'Mindful Living',
      icon: Flame,
      description: 'Live with intention and presence',
    },
    {
      id: 'all_of_above',
      title: 'All of the Above',
      icon: TrendingUp,
      description: 'Complete transformation journey',
    },
  ];

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls for authentication and profile creation
      await apiClient.auth.me(); 
      
      const profileData = {
        wolf_name: wolfName || 'Young Wolf',
        focus_goal: selectedGoal,
        xp: 0,
        level: 1,
        wolf_rank: 'cub',
        current_streak: 0,
        longest_streak: 0,
        total_focus_minutes: 0,
        screen_time_saved: 0,
        last_active_date: new Date().toISOString().split('T')[0],
        completed_onboarding: true,
        is_premium: false,
      };

      await apiClient.entities.UserProfile.create(profileData); 
      
      // Show completion popup first
      setAppStatus('complete');

    } catch (error) {
      console.error("Failed to complete onboarding:", error);
      console.log("Error completing onboarding. Please try again."); 
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handler: Immediately redirects (simulated) to the Home page.
   */
  const handleGoToHome = () => {
    router.push(createPageUrl('Home'));
  };

  // When appStatus becomes 'complete', redirect to the Home page after 1.5s
  // This useEffect is kept but doesn't run router.push immediately anymore, 
  // relying on the button click instead, but can be used for cleanup/tracking.
  useEffect(() => { // HOOK 6
    if (appStatus !== 'complete') return;
  }, [appStatus]);

  // FIX 2: Conditional rendering moved AFTER all hooks to comply with Rules of Hooks.
  
  // Renders the success page after onboarding is complete
  if (appStatus === 'complete') { 
    return (
      <div className="min-h-screen bg-[#fdfcf2] flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-green-200">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center shadow-lg">
            <Sparkles className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-green-700">Journey Started!</h2>
          <p className="text-gray-600 mt-2 mb-6">Welcome, **{wolfName || 'Young Wolf'}**! Your profile is ready.</p>
          
          <Button
            onClick={handleGoToHome}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg shadow-md"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Home
          </Button>

          <p className="text-sm mt-4 text-gray-500">Click above to start your journey.</p>
        </div>
      </div>
    );
  } 
  
  // Renders the simulated home page after navigation is complete
  if (appStatus === 'home') { 
     return (
       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
         <div className="text-center p-12 bg-indigo-50 rounded-3xl shadow-2xl border-4 border-indigo-300">
           <Home className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
           <h2 className="text-4xl font-extrabold text-indigo-800">Welcome Home, Wolf!</h2>
           <p className="text-xl text-indigo-600 mt-2">
             You have successfully navigated to your dashboard.
           </p>
           <p className="text-sm text-gray-500 mt-6">
             (This simulates rendering the target page component.)
           </p>
         </div>
       </div>
     );
  }

  // Renders the main onboarding flow steps
  return (
    <div className="min-h-screen bg-[#fdfcf2] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <style>
          {`
            .wolf-gradient {
              background: linear-gradient(90deg, #b22d15 0%, #de8538 100%);
            }
            .wolf-text-gradient {
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-image: linear-gradient(90deg, #b22d15 0%, #de8538 100%);
            }
          `}
        </style>
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full wolf-gradient flex items-center justify-center shadow-lg">
                  <Flame className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold wolf-text-gradient mb-2">Welcome to Foclupus</h1>
                <p className="text-[#8b7355]">Turn screen time into growth time</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#2d1810] mb-2">
                    What should we call you, wolf?
                  </label>
                  <Input
                    value={wolfName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWolfName(e.target.value)}
                    placeholder="Enter your wolf name..."
                    className="h-12 border-2 border-[#e8d5c4] focus:border-[#b22d15] rounded-xl"
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!wolfName.trim()}
                  className="w-full h-12 wolf-gradient text-white rounded-xl font-semibold text-lg"
                >
                  Continue
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#2d1810] mb-2">
                  What's your main goal?
                </h2>
                <p className="text-[#8b7355]">Choose the path that resonates with you</p>
              </div>

              <div className="space-y-3 mb-6">
                {goals.map((goal) => {
                  const Icon = goal.icon;
                  return (
                    <motion.button
                      key={goal.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedGoal(goal.id)}
                      disabled={isLoading}
                      className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                        selectedGoal === goal.id
                          ? 'border-[#b22d15] bg-gradient-to-r from-red-50 to-orange-50'
                          : 'border-[#e8d5c4] hover:border-[#de8538]/50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          selectedGoal === goal.id ? 'wolf-gradient' : 'bg-[#f9f5f0]'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            selectedGoal === goal.id ? 'text-white' : 'text-[#8b7355]'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[#2d1810] mb-1">{goal.title}</h3>
                          <p className="text-sm text-[#8b7355]">{goal.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-[#e8d5c4] rounded-xl"
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={!selectedGoal || isLoading}
                  className="flex-1 h-12 wolf-gradient text-white rounded-xl font-semibold"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Completing...
                    </>
                  ) : (
                    <>
                      Start Journey
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}