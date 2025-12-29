Foclupus | The Focused Wolf

📖 Overview
Foclupus is a gamified productivity and dopamine detox app inspired by Duolingo's learning model. Users embark on a journey from "Cub" to "Alpha" wolf, building focus habits, completing detox lessons, and breaking screen addiction through daily challenges and mindfulness practices.

📁 Project Structure

```
Lupingo/
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── tailwind.config.ts
├── apps/
│   ├── expo-mobile/
│   │   ├── app.json
│   │   ├── expo-env.d.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── app/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       ├── detox-path/
│   │       │   └── index.tsx
│   │       └── focus-mode/
│   │           └── index.tsx
│   └── next-web/
│       ├── babel.config.js
│       ├── eslint.config.mjs
│       ├── next-env.d.ts
│       ├── next.config.js
│       ├── package.json
│       ├── postcss.config.js
│       ├── react-dom-compat.js
│       ├── react-native-shim.js
│       ├── README.md
│       ├── tailwind.config.js
│       ├── tsconfig.json
│       ├── public/
│       └── src/
│           ├── react-types.d.ts
│           └── app/
│               ├── globals.css
│               ├── layout.tsx
│               ├── page.tsx
│               ├── (app)/
│               │   ├── layout.tsx
│               │   ├── challenges/
│               │   │   └── page.tsx
│               │   ├── detox-path/
│               │   │   └── page.tsx
│               │   ├── focus-mode/
│               │   │   └── page.tsx
│               │   ├── habits/
│               │   │   └── page.tsx
│               │   ├── home/
│               │   │   └── page.tsx
│               │   ├── mindfulness/
│               │   │   └── page.tsx
│               │   ├── onboarding/
│               │   │   └── page.tsx
│               │   ├── profile/
│               │   │   └── page.tsx
│               │   ├── progress/
│               │   │   └── page.tsx
│               │   └── subscription/
│               │       └── page.tsx
│               ├── (marketing)/
│               │   ├── layout.tsx
│               │   ├── about/
│               │   │   └── page.tsx
│               │   ├── blog/
│               │   │   └── page.tsx
│               │   ├── careers/
│               │   │   └── page.tsx
│               │   ├── contact/
│               │   │   └── page.tsx
│               │   └── landing/
│               │       └── page.tsx
│               └── components/
│                   ├── ClientWrapper.tsx
│                   ├── MainLayout.tsx
│                   ├── TailwindComponentWrapper.tsx
│                   ├── TailwindWrapper.tsx
│                   ├── landing/
│                   │   ├── CTASection.tsx
│                   │   ├── DetailedFeaturesSection.tsx
│                   │   ├── DownloadSection.tsx
│                   │   ├── FeaturesSection.tsx
│                   │   ├── Footer.tsx
│                   │   ├── GamificationSection.tsx
│                   │   ├── Header.tsx
│                   │   ├── HeroSection.tsx
│                   │   ├── JourneySection.tsx
│                   │   ├── OnboardingFlowSection.tsx
│                   │   ├── PricingSection.tsx
│                   │   ├── ScrollToTop.tsx
│                   │   ├── TestimonialsSection.tsx
│                   │   └── WhySection.tsx
│                   ├── providers/
│                   │   ├── Providers.tsx
│                   │   └── ...
│                   ├── ui/
│                   │   ├── button.tsx
│                   │   └── ...
│                   └── web-ui/
└── packages/
    ├── api-client/
    │   ├── index.ts
    │   └── package.json
    ├── config/
    └── ui/
        ├── index.ts
        ├── package.json
        ├── pnpm-lock.yaml
        └── src/
            ├── Card.tsx
            ├── ChallengeCard.tsx
            ├── HabitCard.tsx
            ├── SectionHeader.tsx
            ├── StreakDisplay.tsx
            ├── withTailwindProvider.tsx
            ├── WolfButton.tsx
            └── WolfRankBadge.tsx
    └── utils/
        ├── apiClient.ts
        ├── index.ts
        ├── package.json
        ├── types.ts
        └── src/
            ├── navigation.ts
            └── types.ts
```

🎯 Core Features

1. Gamification System

. Wolf Ranks: Cub → Scout → Hunter → Guardian → Alpha
. XP System: Earn points for all activities
. Level Progression: 50+ levels
. Daily Streaks: Track consecutive active days
. Achievements: Milestone-based rewards

2. Focus Mode

Timed Sessions: 15, 25, 45, or 60 minutes
Session Types: Deep Focus, Quick Focus, Pomodoro, Custom
XP Rewards: 10-60 XP per session
Progress Tracking: Total focus minutes logged
Session History: View past sessions

3. Dopamine Detox Path

Progressive Lessons: 12+ structured lessons
Educational Content: Science-backed information
Difficulty Levels: Beginner, Intermediate, Advanced
Completion Tracking: Mark lessons complete
XP Rewards: 15 XP per lesson

4. Habit Building

6 Categories: Movement, Learning, Creativity, Social, Nature, Rest
Daily Completion: Mark habits as done
Streak Tracking: Total completions per habit
XP Rewards: 5 XP per completion
18+ Pre-loaded Habits

5. Daily Challenges

Challenge Types: Focus, Detox, Habit, Mindfulness, Streak
Progress Tracking: Visual progress bars
Target Goals: Specific metrics to hit
Auto-reset: Daily/weekly rotation
XP Rewards: 10+ XP per challenge

6. Mindfulness Tools

Box Breathing: 4-4-4-4 guided exercise
Quick Meditation: 5-10 minute sessions
Gratitude Practice: Reflection exercises
Clarity Check-In: Mood tracking
Before/After Mood Logging

👤 User Journey

1️⃣ First-Time User Flow

Landing Page → Login/Signup → Onboarding → Dashboard
Onboarding: Choose wolf name & select primary goal (reduce screen time, build focus, dopamine detox, mindful living, or all)

2️⃣ Daily User Flow

Home Dashboard → Choose Activity → Complete → Earn XP → Level Up
Check streak & challenges
Complete daily habits (5 XP each)
Start focus session (10-60 XP)
Do mindfulness exercise (5 XP)
Continue detox lesson (15 XP)
Review progress analytics

3️⃣ Progression System

Cub (Lvl 1) → Scout (Lvl 5) → Hunter (Lvl 10) → Guardian (Lvl 20) → Alpha (Lvl 50+)

🗄️ Data Entities

UserProfile

Wolf name, focus goal, XP, level, rank, streaks, total focus minutes, screen time saved, premium status

DetoxLesson

Title, content, lesson number, XP reward, completion status, difficulty, duration

FocusSession

Duration, completion status, XP earned, session type, start/end times, notes

Habit

Title, description, category, XP reward, daily completion, total completions, icon, last completed date

Challenge

Title, description, XP reward, type, target value, current progress, completion status, due date, daily reset

MindfulnessSession

Session type, duration, XP earned, completion status, mood before/after, reflection notes

🛠️ Tech Stack

Frontend

React 18
Tailwind CSS
shadcn/ui components
Lucide React icons
React Router DOM
TanStack React Query
Framer Motion
Recharts
date-fns

Backend (Base44)

Entity management
Authentication
API client (base44 SDK)
Real-time updates
File storage

🚀 What Users Can Do

✅ Create personalized wolf profile
✅ Complete structured detox lessons
✅ Track focus sessions with timer
✅ Build healthy replacement habits
✅ Complete daily challenges
✅ Practice guided breathing
✅ Log mindfulness sessions
✅ View detailed analytics
✅ Earn XP and level up
✅ Maintain daily streaks
✅ Upgrade to premium
✅ Edit profile settings
✅ Track mood changes
✅ Save screen time estimates

🔒 Premium Features

• Unlimited focus sessions
• Advanced analytics & insights
• Exclusive lesson content
• Priority support

💡 Included Sample Data

📚 12 Detox Lessons

Understanding dopamine, screen time awareness, digital boundaries, attention economy, mindful tech use, social media effects, notification management, real connections, boredom tolerance, delayed gratification, focus rituals, maintenance

🎯 20 Daily Challenges

30 min focus, complete 3 habits, finish lesson, 10 min mindfulness, 5-day streak, screen-free morning, no social media hour, read 20 min, exercise outdoors, gratitude practice, and more

💪 18 Habit Templates

Morning walk, read, journal, call friend, yoga, learn, create art, cook, outdoor time, quality sleep, exercise, meditation, creative writing, play instrument, gardening, volunteering, etc.

📊 Tracked Metrics

Engagement
Daily active streaks
Total sessions completed
Total XP earned
Current level & rank
Focus
Total focus minutes
Average session length
Session completion rate
Weekly focus trends
Habits
Daily completion rate
Category distribution
Total habit count
Longest habit streak
Progress
Lessons completed
Challenges done
Screen time saved
Level progression speed

🎨 UX Principles

Instant Feedback: XP celebrations, animations, visual confirmations
Progress Visibility: Bars, rings, charts, badges everywhere
Streak Motivation: Daily check-ins, fire emoji, best streak tracking
Gamification: Levels, ranks, XP, challenges keep users engaged
Simplicity: One primary action per screen, clear CTAs
Beauty: Warm colors, smooth animations, wolf theme consistency
Mobile-First: Responsive design, touch-friendly buttons

🎯 Value Proposition

Transform screen addiction into personal growth through gamification and science-backed techniques.

Unique Differentiators:

Wolf-themed progression (not generic)
Dopamine detox curriculum (educational)
Replace bad habits with good ones (positive focus)
Beautiful, game-like experience (not clinical)
Free to start with premium upsell (accessible)

📊 Current Status

✅ Complete MVP built
✅ 10 pages implemented
✅ 6 entities with data
✅ 6 reusable components
✅ Gamification working
✅ XP & leveling functional
✅ Progress tracking complete
✅ Subscription integrated
✅ Responsive design
✅ Landing page ready

Foclupus © 2025 - Turn screen time into growth time 🐺
