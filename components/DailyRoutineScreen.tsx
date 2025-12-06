import React, { useState } from 'react';
import { CURRICULUM_DATA } from '../data/curriculum';
import { DailyContent, UserProgress } from '../types';
import { BookOpen, Dumbbell, Mic, Lock, CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import ExerciseRunner from './ExerciseRunner';
import SpeakingPractice from './SpeakingPractice';

interface DailyRoutineScreenProps {
    userProgress: UserProgress;
    onUpdateProgress: (type: 'exercise' | 'speaking' | 'day', value?: number) => void;
}

const DailyRoutineScreen: React.FC<DailyRoutineScreenProps> = ({ userProgress, onUpdateProgress }) => {
    const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'study' | 'practice' | 'speak'>('study');
    
    const selectedDayData = selectedDayId ? CURRICULUM_DATA.find(d => d.day === selectedDayId) : null;

    if (selectedDayData) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-6">
                <button 
                    onClick={() => setSelectedDayId(null)}
                    className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
                >
                    <ArrowLeft size={18} /> Back to Curriculum
                </button>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">
                            Day {selectedDayData.day}
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedDayData.title}</h1>
                        <p className="text-slate-500">{selectedDayData.description}</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-slate-100">
                        {[
                            { id: 'study', label: 'Study', icon: <BookOpen size={18} /> },
                            { id: 'practice', label: 'Practice', icon: <Dumbbell size={18} /> },
                            { id: 'speak', label: 'Speak', icon: <Mic size={18} /> },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-semibold transition-colors relative ${
                                    activeTab === tab.id 
                                        ? 'text-blue-600' 
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="p-8 bg-slate-50 min-h-[400px]">
                        {activeTab === 'study' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                                <section>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-blue-500 rounded-full"/> Vocabulary
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {selectedDayData.vocabulary.map((vocab, idx) => (
                                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                                                <span className="font-medium text-slate-900">{vocab.word}</span>
                                                <span className="text-slate-500 text-sm">{vocab.translation}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-purple-500 rounded-full"/> Grammar Focus: {selectedDayData.grammarFocus.title}
                                    </h3>
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                        <ul className="space-y-3">
                                            {selectedDayData.grammarFocus.content.map((point, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                                                    <div className="mt-1.5 w-1.5 h-1.5 bg-purple-400 rounded-full shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'practice' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2">
                                <ExerciseRunner 
                                    exercises={selectedDayData.exercises} 
                                    onComplete={() => onUpdateProgress('day', selectedDayData.day)}
                                    onCorrectAnswer={() => onUpdateProgress('exercise')}
                                />
                            </div>
                        )}

                        {activeTab === 'speak' && (
                             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                <div className="p-4 bg-blue-100 text-blue-800 rounded-lg text-sm mb-4">
                                    Pronounce the sentences below. The AI will analyze your intonation.
                                </div>
                                {selectedDayData.practiceSentences.map((sentence, idx) => (
                                    <SpeakingPractice 
                                        key={idx} 
                                        sentence={sentence} 
                                        onComplete={() => onUpdateProgress('speaking')}
                                    />
                                ))}
                             </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Daily Routine</h1>
                <p className="text-slate-500 mt-1">Your 30-day guided path to A1 proficiency.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CURRICULUM_DATA.map((day) => {
                    const isCompleted = userProgress.completedDays.includes(day.day);
                    const isLocked = day.day > userProgress.currentDay;
                    const isCurrent = day.day === userProgress.currentDay;

                    return (
                        <button
                            key={day.day}
                            onClick={() => !isLocked && setSelectedDayId(day.day)}
                            disabled={isLocked}
                            className={`text-left group relative p-6 rounded-2xl border transition-all duration-200 ${
                                isLocked 
                                    ? 'bg-slate-50 border-slate-200 opacity-75' 
                                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer'
                            } ${isCurrent ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                                    isCompleted 
                                        ? 'bg-green-100 text-green-700' 
                                        : isLocked ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 text-white'
                                }`}>
                                    {isCompleted ? <CheckCircle size={20} /> : day.day}
                                </span>
                                {isLocked && <Lock size={20} className="text-slate-300" />}
                            </div>
                            
                            <h3 className={`font-bold text-lg mb-2 ${isLocked ? 'text-slate-400' : 'text-slate-900'}`}>
                                {day.title}
                            </h3>
                            <p className={`text-sm mb-4 line-clamp-2 ${isLocked ? 'text-slate-400' : 'text-slate-500'}`}>
                                {day.description}
                            </p>

                            <div className="flex items-center text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
                                {isLocked ? <span className="text-slate-400">Locked</span> : (
                                    <>Start Lesson <ChevronRight size={16} /></>
                                )}
                            </div>
                        </button>
                    );
                })}

                {/* Placeholder for future days to fill grid */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`p-${i}`} className="p-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-300">
                        <span className="font-bold text-xl mb-2">Day {i + 3}</span>
                        <Lock size={20} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyRoutineScreen;