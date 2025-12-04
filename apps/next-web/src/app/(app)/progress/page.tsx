'use client';

import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Clock, Target, Trophy, Zap, Flame, Award, Brain, BarChart3, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion'; // Using motion for interactivity

// --- MOCK API Client/Types ---
// NOTE: Replace these with your actual @foclupus imports.
interface FocusSession { id: string; completed: boolean; duration_minutes: number; created_date: string; }
interface Challenge { id: string; completed: boolean; }
interface Habit { id: string; total_completions: number; }
interface DetoxLesson { id: string; completed: boolean; }
interface UserProfile { 
    id: string; 
    xp: number; 
    level: number; 
    wolf_rank: string; 
    current_streak: number; 
    longest_streak: number; 
    total_focus_minutes: number; 
    screen_time_saved: number;
}

const MOCK_PROFILES: UserProfile[] = [{ 
    id: 'user-123', 
    xp: 350, 
    level: 3, 
    wolf_rank: 'Alpha', // Changed to Alpha for more joy!
    current_streak: 5, 
    longest_streak: 7, 
    total_focus_minutes: 420, 
    screen_time_saved: 942, // Increased time saved for a strong stat
}];

const MOCK_SESSIONS: FocusSession[] = [
    { id: 's1', completed: true, duration_minutes: 30, created_date: new Date(Date.now() - 24*60*60*1000).toISOString().split('T')[0] },
    { id: 's2', completed: true, duration_minutes: 45, created_date: new Date(Date.now() - 48*60*60*1000).toISOString().split('T')[0] },
    { id: 's3', completed: true, duration_minutes: 60, created_date: new Date().toISOString().split('T')[0] },
    { id: 's4', completed: true, duration_minutes: 20, created_date: new Date().toISOString().split('T')[0] }, // Today
    { id: 's5', completed: true, duration_minutes: 15, created_date: new Date(Date.now() - 72*60*60*1000).toISOString().split('T')[0] }, // 3 days ago
];
const MOCK_CHALLENGES: Challenge[] = [{ id: 'c1', completed: true }, { id: 'c2', completed: false }];
const MOCK_HABITS: Habit[] = [{ id: 'h1', total_completions: 12 }, { id: 'h2', total_completions: 5 }];
const MOCK_LESSONS: DetoxLesson[] = [{ id: 'l1', completed: true }, { id: 'l2', completed: true }, { id: 'l3', completed: false }, { id: 'l4', completed: false }];

const base44 = {
    entities: {
        UserProfile: { list: async () => MOCK_PROFILES },
        FocusSession: { list: async () => MOCK_SESSIONS },
        Challenge: { list: async () => MOCK_CHALLENGES },
        Habit: { list: async () => MOCK_HABITS },
        DetoxLesson: { list: async () => MOCK_LESSONS },
    },
};

// --- MOCK UI Components (Functional) ---

const SectionHeader = ({ title, icon: Icon }: { title: string, icon?: React.FC<any> }) => (
    <header className="text-center space-y-2">
      {Icon && <Icon className="w-10 h-10 text-wolf-gold mx-auto fill-wolf-gold/10" />}
      <h1 className="text-3xl font-extrabold wolf-text-gradient">{title}</h1>
    </header>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white rounded-3xl border-2 border-wolf-border shadow-xl transition-shadow duration-300 ${className}`}>
      {children}
    </div>
);
const CardHeader = ({ children }: { children: React.ReactNode }) => <div className="p-4 border-b border-wolf-border">{children}</div>;
const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => <h2 className={`text-xl font-bold text-wolf-brown-dark ${className}`}>{children}</h2>;
const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`p-4 ${className}`}>{children}</div>;

const WolfRankBadge = ({ rank, level, size, showLabel }: { rank: string, level: number, size: string, showLabel: boolean }) => (
    <div className={`flex flex-col items-center ${size === 'large' ? 'space-y-2' : 'space-x-2'}`}>
        <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
            <Trophy className={`text-wolf-gold ${size === 'large' ? 'w-16 h-16' : 'w-8 h-8'}`} fill="#de8538" />
        </motion.div>
        {showLabel && <div className="text-sm text-wolf-brown-light">Rank:</div>}
        <span className={`font-extrabold wolf-text-gradient ${size === 'large' ? 'text-2xl' : 'text-lg'}`}>Level {level}: {rank}</span>
    </div>
);

const StreakDisplay = ({ currentStreak, longestStreak, size }: { currentStreak: number, longestStreak: number, size: string }) => (
    <div className={`flex flex-col items-center justify-center ${size === 'large' ? 'space-y-2' : 'space-x-2'}`}>
        <Flame className={`text-wolf-red ${size === 'large' ? 'w-16 h-16' : 'w-8 h-8'}`} fill="#b22d15" />
        <span className={`text-wolf-brown-dark font-extrabold ${size === 'large' ? 'text-4xl' : 'text-2xl'}`}>{currentStreak}</span>
        <span className="text-sm text-wolf-brown-light">Current Streak (Best: {longestStreak})</span>
    </div>
);

// --- TAB FIX IMPLEMENTATION ---

// We need an external state to make the tabs work, so we pass down the state setter.
// NOTE: In a real app, this logic would be handled internally by the imported Tabs component.

const Tabs = ({ children, defaultValue, className, setActiveTab, activeTab }: { children: React.ReactNode, defaultValue: string, className: string, setActiveTab: React.Dispatch<React.SetStateAction<string>>, activeTab: string }) => (
    <div className={className}>{children}</div>
);

const TabsList = ({ children, className }: { children: React.ReactNode, className: string }) => <div className={className}>{children}</div>;

const TabsTrigger = ({ children, value, setActiveTab, activeTab }: { children: React.ReactNode, value: string, setActiveTab: React.Dispatch<React.SetStateAction<string>>, activeTab: string }) => (
    <button 
        onClick={() => setActiveTab(value)} // FIX: State change on click
        className={`flex-1 py-3 font-extrabold transition-all duration-200 rounded-xl whitespace-nowrap ${
            activeTab === value
                ? 'text-wolf-red bg-white shadow-md' // Active style
                : 'text-wolf-brown-light hover:text-wolf-brown-dark hover:bg-wolf-border/70' // Inactive style
        }`}
    >
        {children}
    </button>
);

const TabsContent = ({ children, value, className, activeTab }: { children: React.ReactNode, value: string, className: string, activeTab: string }) => (
    <AnimatePresence mode="wait">
        {activeTab === value && ( // FIX: Conditional rendering
            <motion.div
                key={value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={className}
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
);

// --- END TAB FIX IMPLEMENTATION ---

export default function ProgressPage() {
    const [activeTab, setActiveTab] = useState('focus'); // State for Tab FIX

    // --- Data Fetching ---
        const { data: profiles = [] } = useQuery<UserProfile[]>({ queryKey: ['userProfile'], queryFn: () => base44.entities.UserProfile.list() });
        const { data: focusSessions = [] } = useQuery<FocusSession[]>({ queryKey: ['focusSessions'], queryFn: () => base44.entities.FocusSession.list() });
        const { data: challenges = [] } = useQuery<Challenge[]>({ queryKey: ['challenges'], queryFn: () => base44.entities.Challenge.list() });
        const { data: habits = [] } = useQuery<Habit[]>({ queryKey: ['habits'], queryFn: () => base44.entities.Habit.list() });
        const { data: lessons = [] } = useQuery<DetoxLesson[]>({ queryKey: ['detoxLessons'], queryFn: () => base44.entities.DetoxLesson.list() });

    const userProfile = profiles[0];

    // --- Stats Calculation ---
    const stats = useMemo(() => {
        const completedSessions = focusSessions.filter(s => s.completed);
        const completedChallenges = challenges.filter(c => c.completed);
        const completedHabits = habits.reduce((sum, h) => sum + (h.total_completions || 0), 0);
        const completedLessons = lessons.filter(l => l.completed);

        const minutesSaved = userProfile?.screen_time_saved || 0;
        const hoursSaved = Math.floor(minutesSaved / 60);
        const remainingMinutes = minutesSaved % 60;
        const screenTimeDisplay = `${hoursSaved}h ${remainingMinutes}m`;

        return {
            totalFocusMinutes: userProfile?.total_focus_minutes || 0,
            screenTimeSaved: minutesSaved,
            screenTimeDisplay,
            totalSessions: completedSessions.length,
            completedChallenges: completedChallenges.length,
            completedHabits,
            completedLessons: completedLessons.length,
            totalXP: userProfile?.xp || 0,
            currentLevel: userProfile?.level || 1,
        };
    }, [focusSessions, challenges, habits, lessons, userProfile]);

    // --- Chart Data Preparation (Last 7 Days) ---
    const activityData = useMemo(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return date.toISOString().split('T')[0];
        });

        return last7Days.map(date => {
            const sessionMinutes = focusSessions
                .filter(s => s.created_date?.startsWith(date) && s.completed)
                .reduce((sum, s) => sum + (s.duration_minutes || 0), 0);

            const dayName = new Date(date).toLocaleDateString('en', { weekday: 'short' });
            
            return {
                day: dayName,
                minutes: sessionMinutes,
            };
        });
    }, [focusSessions]);

    // --- XP Progress Calculation ---
    const levelProgress = useMemo(() => {
        const currentLevel = userProfile?.level || 1;
        const currentXP = userProfile?.xp || 0;
        const xpForNextLevel = currentLevel * 100;
        const xpForPreviousLevels = (currentLevel - 1) * 100;
        const xpInCurrentLevel = currentXP - xpForPreviousLevels;
        const progress = Math.min(100, (xpInCurrentLevel / xpForNextLevel) * 100);

        return {
            currentLevel,
            nextLevel: currentLevel + 1,
            xpInCurrentLevel,
            xpForNextLevel,
            progress,
        };
    }, [userProfile]);

    if (!userProfile) {
        return <div className="text-center py-10 text-wolf-brown-light">Loading progress...</div>;
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto p-4 space-y-8"
        >
            <SectionHeader title="Your Wolf Pack Progress" icon={TrendingUp} />

            {/* Rank and Streak Section */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-4 border-2 border-wolf-border bg-gradient-to-tr from-[#fdfcf2] to-[#f8f0e5]">
                    <WolfRankBadge 
                        rank={userProfile.wolf_rank}
                        level={userProfile.level}
                        size="large"
                        showLabel={true}
                    />
                    <div className="pt-4 border-t border-wolf-border">
                        <div className="text-sm text-wolf-brown-light mb-2">
                            <span className="font-bold text-wolf-red">{levelProgress.xpInCurrentLevel} XP</span> / {levelProgress.xpForNextLevel} XP to Level {levelProgress.nextLevel}
                        </div>
                        <div className="w-full h-3 bg-wolf-border rounded-full overflow-hidden shadow-inner">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${levelProgress.progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full wolf-gradient"
                            />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 space-y-4 border-2 border-wolf-border bg-gradient-to-tr from-[#fdfcf2] to-[#f8f0e5]">
                    <StreakDisplay 
                        currentStreak={userProfile.current_streak}
                        longestStreak={userProfile.longest_streak}
                        size="large"
                    />
                    <div className="pt-4 border-t border-wolf-border text-center">
                        <p className="text-sm text-wolf-brown-light">
                            You're in the den! Longest hunt: <span className='font-bold text-wolf-brown-dark'>{userProfile.longest_streak} days</span>
                        </p>
                    </div>
                </Card>
            </div>

            {/* Key Summary Stats */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {/* Time Saved Card (Prominent) */}
                <Card className="p-6 text-center border-2 border-green-300 bg-gradient-to-br from-green-50 to-teal-100 col-span-2 lg:col-span-1">
                    <Clock className="w-10 h-10 text-green-600 mx-auto mb-2" />
                    <div className="text-4xl font-extrabold text-wolf-brown-dark">{stats.screenTimeDisplay}</div>
                    <div className="text-sm text-green-700 font-semibold">Screen Time Saved</div>
                </Card>

                {/* Focus Minutes Card */}
                <Card className="p-6 text-center border-2 border-indigo-300 bg-gradient-to-br from-blue-50 to-indigo-100">
                    <Target className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                    <div className="text-4xl font-extrabold text-wolf-brown-dark">{stats.totalFocusMinutes}</div>
                    <div className="text-sm text-indigo-700 font-semibold">Deep Focus Minutes</div>
                </Card>

                {/* Challenges Won Card */}
                <Card className="p-6 text-center border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-100">
                    <Trophy className="w-10 h-10 text-purple-600 mx-auto mb-2" />
                    <div className="text-4xl font-extrabold text-wolf-brown-dark">{stats.completedChallenges}</div>
                    <div className="text-sm text-purple-700 font-semibold">Challenges Won</div>
                </Card>

                {/* Total XP Card */}
                <Card className="p-6 text-center border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-100">
                    <Zap className="w-10 h-10 text-wolf-gold mx-auto mb-2" />
                    <div className="text-4xl font-extrabold text-wolf-brown-dark">{stats.totalXP}</div>
                    <div className="text-sm text-orange-700 font-semibold">Total Experience (XP)</div>
                </Card>
            </motion.div>

            {/* Activity Chart (Focus Consistency) */}
            <Card className="border-2 border-wolf-border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-wolf-red" />
                        Focus Activity: Last 7 Days
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e8d5c4" vertical={false} />
                                <XAxis dataKey="day" stroke="#8b7355" style={{ fontSize: '12px' }} />
                                <YAxis stroke="#8b7355" style={{ fontSize: '12px' }} />
                                <Tooltip 
                                    formatter={(value) => [`${value} min`, 'Minutes Focused']}
                                    contentStyle={{ 
                                        backgroundColor: '#fdfcf2', 
                                        border: '2px solid #e8d5c4',
                                        borderRadius: '12px'
                                    }}
                                    labelStyle={{ fontWeight: 'bold', color: '#2d1810' }}
                                />
                                <Bar 
                                    dataKey="minutes" 
                                    fill="url(#colorGradient)" 
                                    radius={[8, 8, 0, 0]}
                                    isAnimationActive={true}
                                />
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#b22d15" />
                                        <stop offset="100%" stopColor="#de8538" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Progress Breakdown Tabs */}
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} defaultValue="focus" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-wolf-border rounded-xl p-1 shadow-inner">
                    <TabsTrigger activeTab={activeTab} setActiveTab={setActiveTab} value="focus">Focus</TabsTrigger>
                    <TabsTrigger activeTab={activeTab} setActiveTab={setActiveTab} value="detox">Detox</TabsTrigger>
                    <TabsTrigger activeTab={activeTab} setActiveTab={setActiveTab} value="habits">Habits</TabsTrigger>
                    <TabsTrigger activeTab={activeTab} setActiveTab={setActiveTab} value="achievements">Awards</TabsTrigger>
                </TabsList>

                {/* Focus Tab Content */}
                <TabsContent activeTab={activeTab} value="focus" className="space-y-4 mt-6">
                    <Card className="border-2 border-wolf-border">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2 text-indigo-700">
                                <Target className='w-5 h-5'/> Deep Focus Mastery
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-wolf-brown-light">Total Focus Sessions</span>
                                <span className="font-bold text-wolf-brown-dark">{stats.totalSessions}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-wolf-brown-light">Average Session Duration</span>
                                <span className="font-bold text-wolf-brown-dark">
                                    {stats.totalSessions > 0 
                                        ? Math.round(stats.totalFocusMinutes / stats.totalSessions) 
                                        : 0} min
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-wolf-brown-light">Equivalent Screen Time Saved</span>
                                <span className="font-bold text-wolf-brown-dark">{stats.screenTimeDisplay}</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Detox Tab Content */}
                <TabsContent activeTab={activeTab} value="detox" className="space-y-4 mt-6">
                    <Card className="border-2 border-wolf-border">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2 text-purple-700">
                                <Eye className='w-5 h-5'/> Digital Detox Journey
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-wolf-brown-light">Detox Lessons Completed</span>
                                <span className="font-bold text-wolf-brown-dark">{stats.completedLessons} / {lessons.length}</span>
                            </div>
                            <div className="w-full h-3 bg-wolf-border rounded-full overflow-hidden shadow-inner">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stats.completedLessons / Math.max(lessons.length, 1)) * 100}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                />
                            </div>
                            <p className='text-xs text-wolf-brown-light pt-2'>
                                Keep pushing! You're making real progress in reclaiming your attention.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Habits Tab Content */}
                <TabsContent activeTab={activeTab} value="habits" className="space-y-4 mt-6">
                    <Card className="border-2 border-wolf-border">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2 text-orange-700">
                                <Flame className='w-5 h-5'/> Habit Building Fire
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-wolf-brown-light">Total Habit Completions</span>
                                <span className="font-bold text-wolf-brown-dark">{stats.completedHabits}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-wolf-brown-light">Active Habits Tracked</span>
                                <span className="font-bold text-wolf-brown-dark">{habits.length}</span>
                            </div>
                            <p className='text-xs text-wolf-brown-light pt-2'>
                                Every checkmark builds a stronger foundation for your routine.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Achievements Tab Content */}
                <TabsContent activeTab={activeTab} value="achievements" className="space-y-4 mt-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {/* Always visible Achievement */}
                        <motion.div whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(178, 45, 21, 0.2)' }} className="cursor-pointer">
                            <Card className="border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-100 shadow-md">
                                <CardContent className="p-6 text-center">
                                    <Award className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                                    <h3 className="font-bold text-wolf-brown-dark mb-1">First Focus</h3>
                                    <p className="text-sm text-wolf-brown-light">Completed your very first focus session.</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                        
                        {userProfile.longest_streak >= 7 && (
                            <motion.div whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(178, 45, 21, 0.2)' }} className="cursor-pointer">
                                <Card className="border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-red-100 shadow-md">
                                    <CardContent className="p-6 text-center">
                                        <Flame className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                                        <h3 className="font-bold text-wolf-brown-dark mb-1">Week Warrior</h3>
                                        <p className="text-sm text-wolf-brown-light">Achieved a 7-day focus streak!</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                        
                        {stats.totalFocusMinutes >= 100 && (
                            <motion.div whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(178, 45, 21, 0.2)' }} className="cursor-pointer">
                                <Card className="border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-md">
                                    <CardContent className="p-6 text-center">
                                        <Brain className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                                        <h3 className="font-bold text-wolf-brown-dark mb-1">Focus Master</h3>
                                        <p className="text-sm text-wolf-brown-light">100+ total minutes of deep focus.</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                         {userProfile.level >= 3 && (
                            <motion.div whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(178, 45, 21, 0.2)' }} className="cursor-pointer">
                                <Card className="border-2 border-green-400 bg-gradient-to-br from-green-50 to-teal-100 shadow-md">
                                    <CardContent className="p-6 text-center">
                                        <Trophy className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                        <h3 className="font-bold text-wolf-brown-dark mb-1">Young Hunter</h3>
                                        <p className="text-sm text-wolf-brown-light">Reached Wolf Level 3!</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
            
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
                .wolf-text-gradient {
                    background: linear-gradient(135deg, #b22d15, #de8538);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    color: transparent;
                }
            `}</style>
        </motion.div>
    );
}