'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Settings, Heart, Book, Sparkles, Users, TreePine, Moon, Flame } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK API Client/Types ---
// NOTE: These are mock definitions based on your provided files.
// You should replace these with your actual @foclupus imports.

interface Habit {
  id: string;
  title: string;
  description: string;
  category: 'movement' | 'learning' | 'creativity' | 'social' | 'nature' | 'rest';
  xp_reward: number;
  completed_today: boolean;
  total_completions: number;
  last_completed: string; // ISO date string or similar
}

interface UserProfile {
    id: string;
    xp: number;
}

const MOCK_HABITS: Habit[] = [
    { id: 'h1', title: '30-minute walk', description: 'Get outside for some fresh air.', category: 'movement', xp_reward: 10, completed_today: false, total_completions: 5, last_completed: '2025-12-03' },
    { id: 'h2', title: 'Read 1 chapter', description: 'Focus on non-fiction or educational content.', category: 'learning', xp_reward: 15, completed_today: true, total_completions: 12, last_completed: '2025-12-04' },
    { id: 'h3', title: 'Journal 5 mins', description: 'Write down thoughts and feelings.', category: 'creativity', xp_reward: 5, completed_today: false, total_completions: 2, last_completed: '2025-12-02' },
    { id: 'h4', title: 'Quick stretch', description: '10 minute mobility routine.', category: 'movement', xp_reward: 5, completed_today: true, total_completions: 20, last_completed: '2025-12-04' },
    { id: 'h5', title: 'Early bedtime', description: 'In bed by 10 PM.', category: 'rest', xp_reward: 20, completed_today: false, total_completions: 1, last_completed: '2025-12-01' },
];

const mockUsers: UserProfile[] = [{ id: 'user-123', xp: 100 }];

const base44 = {
  entities: {
    Habit: {
      list: async (sort: string, limit: number) => MOCK_HABITS.sort((a, b) => a.title.localeCompare(b.title)),
      create: async (habitData: any) => console.log('[API MOCK] Created Habit:', habitData),
      update: async (id: string, data: any) => console.log(`[API MOCK] Updated Habit ${id} with:`, data),
    },
    UserProfile: {
        list: async (sort: string, limit: number) => mockUsers,
        update: async (id: string, data: any) => {
            mockUsers[0].xp = data.xp;
            console.log(`[API MOCK] Updated Profile ${id} with:`, data);
        },
    },
  },
};
// --- END MOCK API Client/Types ---

// --- MOCK UI Components (Placeholders) ---
const SectionHeader = ({ title }: { title: string }) => (
  <header className="text-center space-y-2">
    <Flame className="w-10 h-10 text-wolf-gold mx-auto fill-wolf-gold/10" />
    <h1 className="text-3xl font-extrabold wolf-text-gradient">{title}</h1>
  </header>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-3xl border-2 border-wolf-border shadow-lg ${className}`}>
    {children}
  </div>
);

const WolfButton = ({ children, onClick, disabled, className, variant = 'primary', size = 'md', title }: { children: React.ReactNode, onClick: () => void, disabled?: boolean, className?: string, variant?: 'primary' | 'secondary', size?: 'sm' | 'md' | 'icon', title?: string }) => {
    let sizeClasses = 'px-6 py-3';
    if (size === 'sm') sizeClasses = 'px-4 py-2 text-sm';
    if (size === 'icon') sizeClasses = 'w-10 h-10 p-2';

    const baseClasses = `rounded-xl font-bold shadow-md transition-opacity hover:opacity-90 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className} ${sizeClasses}`;

    if (variant === 'secondary') {
        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={`bg-gray-200 text-wolf-brown-dark hover:bg-gray-300 ${baseClasses}`}
                title={title}
            >
                {children}
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`wolf-gradient text-white ${baseClasses}`}
            title={title}
        >
            {children}
        </button>
    );
};

const XPCelebration = ({ xp, onComplete }: { xp: number, onComplete: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <Card className="p-8 text-center border-4 border-wolf-gold">
                <Sparkles className="w-16 h-16 text-wolf-gold mx-auto mb-4 animate-bounce" />
                <h3 className="text-3xl font-black text-wolf-brown-dark mb-2">XP Earned!</h3>
                <p className="text-wolf-brown-light text-lg mb-6">
                    You gained <span className="text-wolf-red font-extrabold">+{xp} XP</span> for completing a habit.
                </p>
                <WolfButton onClick={onComplete}>
                    Continue
                </WolfButton>
            </Card>
        </div>
    );
};

// Form Field Placeholders
const Input = ({ value, onChange, placeholder, className }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string, className: string }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-wolf-red focus:border-wolf-red ${className}`}
    />
);

const Textarea = ({ value, onChange, placeholder, className }: { value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, placeholder: string, className: string }) => (
    <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-wolf-red focus:border-wolf-red ${className}`}
    />
);

const Select = ({ value, onValueChange, children }: { value: string, onValueChange: (value: string) => void, children: React.ReactNode }) => (
    <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-xl bg-white appearance-none focus:ring-wolf-red focus:border-wolf-red"
    >
        {children}
    </select>
);

const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectItem = ({ value, children }: { value: string, children: React.ReactNode }) => <option value={value}>{children}</option>;

// Habit Card Component
const categoryIcons = {
    movement: Heart,
    learning: Book,
    creativity: Sparkles,
    social: Users,
    nature: TreePine,
    rest: Moon,
};

const HabitCard: React.FC<{ habit: Habit, onComplete: (habit: Habit) => void }> = ({ habit, onComplete }) => {
    const Icon = categoryIcons[habit.category] || Heart;
    const isCompleted = habit.completed_today;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: isCompleted ? 1 : 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`p-4 rounded-xl border-2 transition-all ${
                isCompleted
                    ? 'border-green-400 bg-green-50 opacity-70 cursor-default'
                    : 'border-wolf-border hover:border-wolf-red cursor-pointer'
            }`}
            onClick={() => !isCompleted && onComplete(habit)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'bg-wolf-red'}`}>
                        <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className={`font-semibold ${isCompleted ? 'text-green-700 line-through' : 'text-wolf-brown-dark'}`}>
                        {habit.title}
                    </h3>
                </div>
                <div className={`text-xs font-bold ${isCompleted ? 'text-green-700' : 'text-wolf-red'}`}>
                    {isCompleted ? 'Done!' : `+${habit.xp_reward} XP`}
                </div>
            </div>
            
            <p className={`text-xs mt-2 truncate ${isCompleted ? 'text-green-600' : 'text-wolf-brown-light'}`}>
                {isCompleted ? `Completed Today` : habit.description}
            </p>
        </motion.div>
    );
};
// --- END MOCK UI Components ---

// --- Category Data ---
const categories = [
    { value: 'movement', label: 'Movement', icon: Heart },
    { value: 'learning', label: 'Learning', icon: Book },
    { value: 'creativity', label: 'Creativity', icon: Sparkles },
    { value: 'social', label: 'Social', icon: Users },
    { value: 'nature', label: 'Nature', icon: TreePine },
    { value: 'rest', label: 'Rest', icon: Moon },
];
// --- END Category Data ---

export default function HabitsPage() {
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [showXP, setShowXP] = useState(false);
    const [earnedXP, setEarnedXP] = useState(0);
    const [newHabit, setNewHabit] = useState({
        title: '',
        description: '',
        category: 'movement' as Habit['category'],
        xp_reward: 10,
    });

    // NOTE: Using mock data list function
    const { data: habits = [] } = useQuery<Habit[]>({
        queryKey: ['habits'],
        queryFn: () => base44.entities.Habit.list('-created_date', 50),
    });

    // NOTE: Using mock user profile list function
    const { data: profiles = [] } = useQuery<UserProfile[]>({
        queryKey: ['userProfile'],
        queryFn: () => base44.entities.UserProfile.list('-created_date', 1),
    });

    const createHabitMutation = useMutation({
        mutationFn: (habitData: typeof newHabit) => {
            // Mock API logic to add new habit
            const habitToCreate: Habit = {
                ...habitData,
                id: `h${Date.now()}`,
                completed_today: false,
                total_completions: 0,
                last_completed: '',
            };
            MOCK_HABITS.unshift(habitToCreate);
            return base44.entities.Habit.create(habitToCreate);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['habits'] });
            setShowForm(false);
            setNewHabit({ title: '', description: '', category: 'movement', xp_reward: 10 });
        },
    });

    const completeHabitMutation = useMutation({
        mutationFn: async (habit: Habit) => {
            const xp = habit.xp_reward;
            
            // 1. Update Habit status locally for mock and log update
            const habitIndex = MOCK_HABITS.findIndex(h => h.id === habit.id);
            if (habitIndex !== -1) {
                MOCK_HABITS[habitIndex] = {
                    ...habit,
                    completed_today: true,
                    total_completions: (habit.total_completions || 0) + 1,
                    last_completed: new Date().toISOString().split('T')[0],
                };
            }
            await base44.entities.Habit.update(habit.id, {
                completed_today: true,
                total_completions: (habit.total_completions || 0) + 1,
                last_completed: new Date().toISOString().split('T')[0],
            });
            
            // 2. Update user XP
            const profile = profiles[0];
            if (profile) {
                await base44.entities.UserProfile.update(profile.id, {
                    xp: (profile.xp || 0) + xp,
                });
            }
            return xp;
        },
        onSuccess: (xp) => {
            setEarnedXP(xp);
            setShowXP(true);
            queryClient.invalidateQueries({ queryKey: ['habits'] });
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },
    });

    const groupedHabits = habits.reduce((acc, habit) => {
        const cat = habit.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(habit);
        return acc;
    }, {} as Record<Habit['category'], Habit[]>);

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-8">
            <AnimatePresence>
                {showXP && <XPCelebration xp={earnedXP} onComplete={() => setShowXP(false)} />}
            </AnimatePresence>

            <SectionHeader title="Your Wolf Pack Habits" />
            
            {/* Header & Button */}
            <div className="flex items-center justify-between pt-2">
                <h2 className="text-xl font-semibold text-wolf-brown-dark">Build Your Routine ({habits?.length || 0})</h2>
                <div className="flex space-x-2">
                    {/* NOTE: Assuming createPageUrl or Link logic is available for settings */}
                    <Link href={'/settings/habits'}>
                         <WolfButton onClick={() => {}} variant="secondary" size="icon" className='border border-wolf-border' title="Habit Settings">
                            <Settings className="w-5 h-5" />
                        </WolfButton>
                    </Link>
                    <WolfButton
                        onClick={() => setShowForm(!showForm)}
                        size="icon"
                        title="Add New Habit"
                    >
                        <Plus className="w-5 h-5" />
                    </WolfButton>
                </div>
            </div>
            
            {/* Create Habit Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="p-6 space-y-4">
                            <h3 className="text-lg font-bold text-wolf-brown-dark">Create New Habit</h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-wolf-brown-dark mb-1">Title</label>
                                    <Input
                                        value={newHabit.title}
                                        onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
                                        placeholder="e.g., 30-minute walk"
                                        className="border-2 border-wolf-border"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-wolf-brown-dark mb-1">Description (Optional)</label>
                                    <Textarea
                                        value={newHabit.description}
                                        onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                                        placeholder="What does this habit involve?"
                                        className="border-2 border-wolf-border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-wolf-brown-dark mb-1">Category</label>
                                    <Select
                                        value={newHabit.category}
                                        onValueChange={(value) => setNewHabit({ ...newHabit, category: value as Habit['category'] })}
                                    >
                                        <SelectContent>
                                            {categories.map((cat) => {
                                                const Icon = cat.icon;
                                                return (
                                                    <SelectItem key={cat.value} value={cat.value}>
                                                        <div className="flex items-center gap-2">
                                                            <Icon className="w-4 h-4" />
                                                            {cat.label}
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-wolf-brown-dark mb-1">XP Reward ({newHabit.xp_reward})</label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="50"
                                        step="5"
                                        value={newHabit.xp_reward}
                                        onChange={(e) => setNewHabit({ ...newHabit, xp_reward: parseInt(e.target.value) })}
                                        className="w-full h-8 accent-wolf-red"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <WolfButton
                                    onClick={() => setShowForm(false)}
                                    variant="secondary"
                                    className="flex-1 border-2 border-wolf-border"
                                >
                                    Cancel
                                </WolfButton>
                                <WolfButton
                                    onClick={() => createHabitMutation.mutate(newHabit)}
                                    disabled={!newHabit.title.trim() || createHabitMutation.isPending}
                                    className="flex-1"
                                >
                                    {createHabitMutation.isPending ? 'Creating...' : 'Create Habit'}
                                </WolfButton>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Grouped Habits List */}
            <div className="space-y-8">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const habitsInCategory = groupedHabits[cat.value as Habit['category']] || [];
                    
                        if (habitsInCategory.length === 0) return null;

                        return (
                            <div key={cat.value}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b22d15] to-[#de8538] flex items-center justify-center shadow-md">
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-wolf-brown-dark">{cat.label} Habits</h2>
                                    <span className="text-sm text-wolf-brown-light">({habitsInCategory.length})</span>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <AnimatePresence>
                                        {habitsInCategory.map((habit: Habit) => (
                                            <HabitCard
                                                key={habit.id}
                                                habit={habit}
                                                onComplete={(h) => completeHabitMutation.mutate(h)}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })}
            </div>

            {/* Empty State */}
            {habits.length === 0 && !showForm && (
                <Card className="text-center py-12 border-dashed">
                    <Heart className="w-16 h-16 text-wolf-brown-light mx-auto mb-4 opacity-50" />
                    <p className="text-wolf-brown-light mb-4">No habits yet. Start building healthy routines!</p>
                    <WolfButton
                        onClick={() => setShowForm(true)}
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Create Your First Habit
                    </WolfButton>
                </Card>
            )}
            
            {/* Global CSS for Wolf colors/gradient */}
                {/* styled-jsx: ignore type error for global style */}
                {/* @ts-ignore */}
                <style jsx global>{`
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
                    .accent-wolf-red {
                        accent-color: #b22d15;
                    }
                `}</style>
        </div>
    );
}