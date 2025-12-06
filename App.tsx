import React, { useState } from 'react';
import Header from './components/Header';
import ComparisonScreen from './components/ComparisonScreen';
import DailyRoutineScreen from './components/DailyRoutineScreen';
import CertificationScreen from './components/CertificationScreen';
import DrawingScreen from './components/DrawingScreen';
import ReadingScreen from './components/ReadingScreen';
import { View, UserProgress } from './types';
import { Construction } from 'lucide-react';

// Placeholder for Dashboard (Low priority compared to core features)
const DashboardPlaceholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center px-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Construction className="text-slate-400" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Learner Dashboard</h1>
        <p className="text-slate-500 max-w-md">Coming soon. Track your daily streaks and XP here.</p>
    </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('compare');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedDays: [1],
    currentDay: 2,
    xp: 150,
    exercisesCompleted: 5,
    speakingSessionsCompleted: 1
  });

  const handleUpdateProgress = (type: 'exercise' | 'speaking' | 'day', value?: number) => {
    setUserProgress(prev => {
        const newStats = { ...prev };
        if (type === 'exercise') {
            newStats.exercisesCompleted += 1;
            newStats.xp += 10;
        }
        if (type === 'speaking') {
            newStats.speakingSessionsCompleted += 1;
            newStats.xp += 15;
        }
        if (type === 'day' && value && !newStats.completedDays.includes(value)) {
            newStats.completedDays = [...newStats.completedDays, value];
            newStats.xp += 100;
            if (value === newStats.currentDay) {
                newStats.currentDay += 1;
            }
        }
        return newStats;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-grow">
        {currentView === 'compare' && <ComparisonScreen />}
        {currentView === 'dashboard' && <DashboardPlaceholder />}
        {currentView === 'routine' && 
            <DailyRoutineScreen 
                userProgress={userProgress} 
                onUpdateProgress={handleUpdateProgress} 
            />
        }
        {currentView === 'certification' && 
            <CertificationScreen userProgress={userProgress} />
        }
        {currentView === 'draw' && <DrawingScreen />}
        {currentView === 'stories' && <ReadingScreen />}
      </main>
    </div>
  );
};

export default App;