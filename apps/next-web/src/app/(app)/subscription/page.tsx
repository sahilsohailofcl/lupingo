'use client'; 

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, Check, Sparkles, Target, Brain, TrendingUp, 
  Clock, Award, Zap, Shield, X 
} from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface UserProfile {
  id: string;
  is_premium: boolean;
  wolf_name: string;
}

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface TestimonialItem {
  name: string;
  rank: string;
  text: string;
}

// --- MOCK UTILITIES AND COMPONENTS FOR SELF-CONTAINED EXECUTION ---

/**
 * Mock: Simulates navigation.
 */
const useMockNavigate = () => {
  // Fixed: Parameter 'url' implicitly has an 'any' type.
  return (url: string) => { 
    console.log(`Simulating navigation to: ${url}`);
    // We will use a state change in the main component to simulate the effect of navigating away.
  };
};

/**
 * Mock: Simulates page URL creation.
 */
// Fixed: Parameter 'pageName' implicitly has an 'any' type.
const createPageUrl = (pageName: string): string => `/app/${pageName.toLowerCase()}`;

/**
 * Mock Component: Button (Replacement for Shadcn Button)
 */
// Fixed: Binding element 'onClick', 'disabled', 'className', 'children' implicitly has an 'any' type.
const Button: React.FC<ButtonProps> = ({ onClick, disabled, className, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-3 font-semibold rounded-xl transition-opacity flex items-center justify-center ${
      className || 'bg-blue-600 text-white hover:bg-blue-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
  >
    {children}
  </button>
);

/**
 * Mock Component: Card (Replacement for Shadcn Card)
 */
// Fixed: Binding element 'className', 'children' implicitly has an 'any' type.
const Card: React.FC<CardProps> = ({ className, children }) => (
  <div className={`bg-white rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

/**
 * Mock Component: CardContent (Replacement for Shadcn CardContent)
 */
// Fixed: Binding element 'className', 'children' implicitly has an 'any' type.
const CardContent: React.FC<CardProps> = ({ className, children }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// --- MAIN SUBSCRIPTION COMPONENT ---

export default function Subscription() {
  const navigate = useMockNavigate(); 
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Fixed: Explicitly type state as UserProfile or null
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isNavigating, setIsNavigating] = useState(false); 

  // Simulate initial profile fetch (replaces useQuery)
  useEffect(() => {
    // Use the defined interface for the mock profile
    const mockProfile: UserProfile = { 
      id: 'user-123',
      is_premium: false, // Start as non-premium for testing the upgrade flow
      wolf_name: 'Hunter Wolf',
    };
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Fixed: Argument of type '{...}' is not assignable to parameter of type '(prev: null) => null'.
      setUserProfile(mockProfile); 
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  
  // Simulate the upgrade mutation (replaces useMutation)
  const handleUpgrade = async () => {
    // userProfile is now correctly typed as UserProfile | null
    if (!userProfile || userProfile.is_premium) return;

    setIsProcessing(true);
    // Fixed: Property 'id' does not exist on type 'never'.
    console.log(`Simulating API call: Upgrading profile ${userProfile.id} to premium...`);

    // Simulate API delay for the update operation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate successful update and state change
    // Fixed: Spread types may only be created from object types & Property 'is_premium' does not exist on type 'never'.
    setUserProfile(prev => {
        if (!prev) return null; // Safety check: if prev is null, return null.
        return { ...prev, is_premium: true }; // Now prev is guaranteed to be UserProfile
    });
    
    setIsProcessing(false);
    
    console.log("Profile successfully upgraded. Simulating navigation to Home.");

    // Simulate navigation after successful upgrade
    setIsNavigating(true);
    setTimeout(() => {
        // In a real app, this would be navigate(createPageUrl('Home'));
        // Here, we just log the action.
        setIsNavigating(false);
        console.log("Navigation complete.");
    }, 1000);
  };

  const handleClose = () => {
    // Simulate navigation back to home page
    setIsNavigating(true);
    setTimeout(() => {
      setIsNavigating(false);
      console.log("Navigation to Home simulated.");
      // In a real app, navigate(createPageUrl('Home')); would happen here
    }, 500);
  };


  // Use the defined FeatureItem interface
  const features: FeatureItem[] = [
    {
      icon: Target,
      title: 'Unlimited Focus Sessions',
      description: 'No limits on your deep work time',
    },
    {
      icon: Brain,
      title: 'Advanced Detox Lessons',
      description: 'Exclusive content & strategies',
    },
    {
      icon: TrendingUp,
      title: 'Detailed Analytics',
      description: 'Deep insights into your progress',
    },
    {
      icon: Clock,
      title: 'Custom Focus Timers',
      description: 'Create your own session lengths',
    },
    {
      icon: Award,
      title: 'Exclusive Achievements',
      description: 'Unlock premium badges & rewards',
    },
    {
      icon: Sparkles,
      title: 'Priority Support',
      description: 'Get help when you need it most',
    },
  ];

  // Use the defined TestimonialItem interface
  const testimonials: TestimonialItem[] = [
    {
      name: 'Sarah M.',
      rank: 'Alpha Wolf',
      text: 'Foclupus helped me reclaim 3 hours a day from social media. Life-changing!',
    },
    {
      name: 'James K.',
      rank: 'Guardian Wolf',
      text: 'The focus sessions are incredible. I\'ve never been more productive.',
    },
    {
      name: 'Emma L.',
      rank: 'Hunter Wolf',
      text: 'Finally, an app that actually helps me break bad habits instead of creating them.',
    },
  ];

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-[#b22d15] border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="ml-3 text-[#8b7355]">Loading profile...</p>
      </div>
    );
  }

  // Display message if premium, simulating success and navigation
  // Fixed: Property 'is_premium' does not exist on type 'never'.
  if (userProfile.is_premium) {
    return (
      <div className="min-h-screen bg-[#fdfcf2] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-white rounded-3xl p-8 shadow-xl max-w-lg"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#2d1810] mb-2">You're a Premium Wolf!</h1>
          <p className="text-[#8b7355]">
            {/* Fixed: Property 'wolf_name' does not exist on type 'never'. */}
            Enjoy unlimited access to all features, {userProfile.wolf_name}.
          </p>
          <Button
            onClick={handleClose}
            className="mt-6 wolf-gradient px-6 h-12 text-white rounded-xl font-bold"
            disabled={isNavigating}
          >
            Go to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfcf2] relative">
      <div className="max-w-5xl mx-auto p-4 space-y-8 pb-12">
        {/* Custom CSS for gradients */}
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

        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isProcessing || isNavigating}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white border-2 border-[#e8d5c4] flex items-center justify-center hover:bg-[#f9f5f0] transition-colors shadow-md"
        >
          <X className="w-5 h-5 text-[#8b7355]" />
        </button>

        {/* Hero Section */}
        <div className="text-center space-y-4 pt-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-24 h-24 mx-auto rounded-full wolf-gradient flex items-center justify-center shadow-2xl"
          >
            <Crown className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold wolf-text-gradient mb-3">
              Become a Premium Wolf
            </h1>
            <p className="text-lg text-[#8b7355] max-w-2xl mx-auto">
              Unlock your full potential with unlimited focus power, exclusive lessons, and advanced insights.
            </p>
          </motion.div>
        </div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-4 border-[#b22d15] shadow-2xl max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="text-5xl font-bold text-[#2d1810] mb-2">£4.99</div>
                <div className="text-[#8b7355]">per month</div>
                <div className="mt-4 inline-block bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full border-2 border-green-200">
                  <span className="text-green-700 font-semibold text-sm">🎉 7-Day Free Trial</span>
                </div>
              </div>

              <Button
                onClick={handleUpgrade}
                disabled={isProcessing || isNavigating}
                className="w-full h-14 wolf-gradient hover:opacity-90 text-white rounded-2xl font-bold text-lg mb-4"
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                    </motion.div>
                    Activating...
                  </>
                ) : (
                  <>
                    <Crown className="w-6 h-6 mr-2" />
                    Start Free Trial
                  </>
                )}
              </Button>

              <p className="text-xs text-[#8b7355]">
                Cancel anytime • No commitment required
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <div>
          <h2 className="text-3xl font-bold text-center text-[#2d1810] mb-6 mt-12">
            Everything You Get
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="border-2 border-[#e8d5c4] h-full hover:border-[#de8538]/50 transition-all">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl wolf-gradient flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-[#2d1810] mb-2">{feature.title}</h3>
                      <p className="text-sm text-[#8b7355]">{feature.description}</p>
                      <div className="mt-3 flex items-center gap-2 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="text-xs font-semibold">Premium Exclusive</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-gradient-to-br from-[#f9f5f0] to-[#f5f0ec] rounded-3xl p-8 border-2 border-[#e8d5c4] mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2d1810] mb-2">Join Our Focused Pack</h2>
            <p className="text-[#8b7355]">See what other premium members are saying</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-[#e8d5c4] shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full wolf-gradient flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[#2d1810] text-sm">{testimonial.name}</div>
                    <div className="text-xs text-[#8b7355]">{testimonial.rank}</div>
                  </div>
                </div>
                <p className="text-sm text-[#2d1810] leading-relaxed italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pt-8">
          <p className="text-[#2d1810] text-xl font-semibold mb-6">
            Start your 7-Day Free Trial now and become the ultimate focused wolf.
          </p>
          <Button
            onClick={handleUpgrade}
            disabled={isProcessing || isNavigating}
            className="wolf-gradient hover:opacity-90 text-white rounded-2xl font-bold px-10 h-14 text-lg"
          >
            <Crown className="w-6 h-6 mr-2" />
            Start Free Trial Today
          </Button>
        </div>
      </div>
    </div>
  );
}