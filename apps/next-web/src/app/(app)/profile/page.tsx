'use client';

import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- Foclupus Imports (Consolidated) ---
import { apiClient } from '@foclupus/utils/apiClient';
import { UserProfile } from '@foclupus/utils/types';
import { SectionHeader, WolfRankBadge, Card as WolfCard, WolfButton } from '@foclupus/ui'; // Renamed Card to WolfCard to avoid conflict
import { createPageUrl } from '@foclupus/utils';

// --- Shadcn/UI Imports (Assuming standard setup) ---
// NOTE: I've replaced the simple `Card` mock with the explicit imports you used in the second block.

// Define a fallback User type if not exported
type User = { email: string };
// Extend UserProfile locally to include missing fields
type ExtendedUserProfile = UserProfile & {
  focus_goal?: string;
  total_focus_minutes?: number;
  wolf_rank?: string;
  level?: number;
  wolf_name?: string;
  current_streak?: number;
  longest_streak?: number;
  xp?: number;
  is_premium?: boolean;
};
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// --- Icon Imports ---
import { Settings, LogOut, Crown, Zap, Edit2, Check, X, Sparkles, TrendingUp, Flame } from 'lucide-react';

export default function ProfilePage() {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');

    // 1. Fetch User (for email) and Profile (for stats/name)
    const { data: user, isLoading: isUserLoading } = useQuery<User>({
        queryKey: ['currentUser'],
        queryFn: () => apiClient.auth.me(),
    });

    const { data: profiles = [], isLoading: isProfileLoading } = useQuery<ExtendedUserProfile[]>({
        queryKey: ['userProfile'],
        queryFn: () => apiClient.entities.UserProfile.list('-created_date', 1),
    });

    const userProfile = profiles[0];

    // 2. Name Update Mutation - MUST be called before early returns
    const updateNameMutation = useMutation({
        mutationFn: (newName: string) => apiClient.entities.UserProfile.update(userProfile?.id || '', { wolf_name: newName }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
            setIsEditing(false);
        },
    });

    // 3. Helper to map goal to a readable string - MUST be called before early returns
    const focusGoalDisplay = useMemo(() => {
        switch (userProfile?.focus_goal) {
            case 'reduce_screen_time': return { name: 'Reduce Screen Time', icon: TrendingUp };
            case 'build_focus': return { name: 'Build Deep Focus', icon: Flame };
            case 'dopamine_detox': return { name: 'Dopamine Detox', icon: Sparkles };
            case 'mindful_living': return { name: 'Mindful Living', icon: Crown };
            case 'all_of_above': return { name: 'Complete Transformation', icon: Zap };
            default: return { name: 'Focus Goal Undefined', icon: Sparkles };
        }
    }, [userProfile?.focus_goal]);

    // Handle loading and missing profile
    const isLoading = isUserLoading || isProfileLoading;

    if (isLoading) {
        return <div className="text-center py-10 text-wolf-brown-light">Loading profile details...</div>;
    }

    if (!userProfile || !user) {
        return <div className="text-center py-10 text-red-600">No user or profile data found.</div>;
    }

    // Handlers (safe to call after early returns since they use hooks set up above)
    const handleStartEdit = () => {
        setEditedName(userProfile.wolf_name || '');
        setIsEditing(true);
    };

    const handleSaveName = () => {
        if (editedName.trim() && editedName !== userProfile.wolf_name) {
            updateNameMutation.mutate(editedName);
        } else {
            setIsEditing(false); // Close if no change
        }
    };

    const handleLogout = () => {
        apiClient.auth.logout();
        apiClient.auth.redirectToLogin(); // Use the standard redirect
    };

    const motionVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        hover: { scale: 1.02, transition: { type: "spring", stiffness: 300 } }
    };

    return (
        <motion.div 
            initial="initial"
            animate="animate"
            variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="max-w-4xl mx-auto p-4 space-y-8"
        >
            {/* Header and Settings Button */}
            <motion.div variants={motionVariants} className="flex justify-between items-center">
                <SectionHeader title={`My Wolf Den`} />
                <Link href={createPageUrl('Settings')} passHref>
                    <WolfButton variant="secondary" size="icon" className="shadow-md hover:shadow-lg">
                        <Settings className="w-5 h-5 text-wolf-brown-dark" />
                    </WolfButton>
                </Link>
            </motion.div>

            {/* Main Profile Card (Name Edit, Rank, XP) */}
            <motion.div variants={motionVariants}>
                <Card className="border-2 border-[#e8d5c4] bg-gradient-to-br from-orange-50 to-red-50 shadow-xl">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                            {/* Wolf Avatar Placeholder */}
                            <div className="w-24 h-24 rounded-full wolf-gradient flex items-center justify-center text-white text-4xl font-bold shadow-2xl ring-4 ring-wolf-gold/50">
                                {userProfile.wolf_name?.charAt(0).toUpperCase() || 'W'}
                            </div>
                            
                            <div className="flex-1">
                                {/* Name Display / Edit */}
                                {!isEditing ? (
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-3xl font-extrabold wolf-text-gradient">
                                            {userProfile.wolf_name}
                                        </h1>
                                        <Button
                                            onClick={handleStartEdit}
                                            size="icon"
                                            variant="ghost"
                                            className="w-8 h-8 text-[#8b7355] hover:text-[#b22d15] transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 mb-2">
                                        <Input
                                            value={editedName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedName(e.target.value)}
                                            className="h-10 text-lg font-bold border-2 border-[#b22d15] rounded-xl focus:ring-2 focus:ring-[#de8538]"
                                        />
                                        <Button
                                            onClick={handleSaveName}
                                            size="icon"
                                            className="w-10 h-10 bg-green-600 hover:bg-green-700 shadow-md"
                                            disabled={updateNameMutation.isPending}
                                        >
                                            <Check className="w-5 h-5" />
                                        </Button>
                                        <Button
                                            onClick={() => setIsEditing(false)}
                                            size="icon"
                                            variant="outline"
                                            className="w-10 h-10 border-red-300 text-red-600 hover:bg-red-50"
                                        >
                                            <X className="w-5 h-5" />
                                        </Button>
                                    </div>
                                )}
                                
                                <p className="text-sm text-[#8b7355] mb-4 font-mono">{user.email}</p>
                                
                                <div className="flex items-center gap-4 border-t pt-4 border-[#e8d5c4]">
                                    <WolfRankBadge 
                                        rank={userProfile.wolf_rank}
                                    />
                                    <div className="pl-4 border-l border-[#e8d5c4]">
                                        <div className="text-xl font-bold text-wolf-red">
                                            Level {userProfile.level}
                                        </div>
                                        <div className="text-sm text-[#8b7355] font-semibold">{userProfile.xp} XP Total</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
                <motion.div variants={motionVariants} whileHover="hover">
                    <WolfCard className="p-4 text-center bg-gray-50 border-gray-200 shadow-sm">
                        <p className="text-2xl font-extrabold text-wolf-red">{userProfile.current_streak}</p>
                        <p className="text-sm text-wolf-brown-light">Current Streak</p>
                    </WolfCard>
                </motion.div>
                <motion.div variants={motionVariants} whileHover="hover">
                    <WolfCard className="p-4 text-center bg-gray-50 border-gray-200 shadow-sm">
                        <p className="text-2xl font-extrabold text-wolf-brown-dark">{userProfile.longest_streak}</p>
                        <p className="text-sm text-wolf-brown-light">Longest Streak</p>
                    </WolfCard>
                </motion.div>
                <motion.div variants={motionVariants} whileHover="hover">
                    <WolfCard className="p-4 text-center bg-gray-50 border-gray-200 shadow-sm">
                        <p className="text-2xl font-extrabold text-green-600">{Math.round((userProfile?.total_focus_minutes ?? 0) / 60)}h</p>
                        <p className="text-sm text-wolf-brown-light">Focus Time (Hrs)</p>
                    </WolfCard>
                </motion.div>
            </div>


            {/* Focus Goal Card */}
            <motion.div variants={motionVariants}>
                <Card className="border-2 border-[#e8d5c4] shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl wolf-text-gradient font-bold">
                            <focusGoalDisplay.icon className="w-6 h-6 text-wolf-red" />
                            My Core Focus
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 shadow-inner">
                            <p className="text-lg font-semibold text-[#2d1810]">
                                {focusGoalDisplay.name}
                            </p>
                            <p className="text-sm text-[#8b7355] mt-1">
                                This is the mission guiding your journey. Keep up the hunt!
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Subscription Status Card */}
            <motion.div variants={motionVariants}>
                <Card className="border-2 border-[#e8d5c4] shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl text-[#de8538] font-bold">
                            <Crown className="w-6 h-6 fill-[#de8538]/50" />
                            Subscription Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {userProfile.is_premium ? (
                            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-amber-300 shadow-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="w-6 h-6 text-amber-600 fill-amber-300" />
                                    <span className="font-extrabold text-xl text-[#2d1810]">Alpha Pack Member</span>
                                </div>
                                <p className="text-sm text-[#8b7355]">
                                    You have unlimited access to all features, insights, and lessons.
                                </p>
                            </div>
                        ) : (
                            <div className='space-y-4'>
                                <p className="text-[#8b7355]">
                                    Upgrade to Alpha Pack for unlimited sessions, advanced insights, and exclusive content.
                                </p>
                                <Button
                                    onClick={() => window.location.href = createPageUrl('Subscription')}
                                    className="w-full h-12 wolf-gradient hover:opacity-90 text-white rounded-xl font-semibold shadow-lg transition-all"
                                >
                                    <Crown className="w-5 h-5 mr-2" />
                                    Upgrade to Alpha Pack
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Logout Button (Isolated and clearly styled) */}
            <motion.div variants={motionVariants}>
                <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full h-12 border-2 border-red-300 text-red-600 hover:bg-red-50 rounded-xl font-semibold shadow-md transition-shadow"
                >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout of Foclupus
                </Button>
            </motion.div>

            {/* Footer */}
            <motion.div variants={motionVariants} className="text-center text-sm text-[#8b7355] pt-4">
                <p>Foclupus v1.0 • The Focused Wolf</p>
                <p className="mt-1">Turn screen time into growth time 🐺</p>
            </motion.div>

            {/* Move these styles to a global CSS file like globals.css for proper usage. */}
        </motion.div>
    );
}