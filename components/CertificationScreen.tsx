import React from 'react';
import { Award, ShieldCheck, TrendingUp, CheckCircle2, Lock } from 'lucide-react';
import { UserProgress } from '../types';

interface CertificationScreenProps {
    userProgress: UserProgress;
}

const CertificationScreen: React.FC<CertificationScreenProps> = ({ userProgress }) => {
    // Requirements constants
    const REQ_DAYS = 30;
    const REQ_EXERCISES = 60;
    const REQ_SPEAKING = 15;

    // Calculate completion status
    const daysDone = userProgress.completedDays.length;
    const exercisesDone = userProgress.exercisesCompleted;
    const speakingDone = userProgress.speakingSessionsCompleted;

    const daysProgress = Math.min((daysDone / REQ_DAYS) * 100, 100);
    const exercisesProgress = Math.min((exercisesDone / REQ_EXERCISES) * 100, 100);
    const speakingProgress = Math.min((speakingDone / REQ_SPEAKING) * 100, 100);

    // Weighted Total Progress (Roughly equal weight for demonstration)
    const totalProgress = Math.floor((daysProgress + exercisesProgress + speakingProgress) / 3);

    const isUnlockable = totalProgress >= 100;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 text-blue-300 font-bold uppercase tracking-wider text-sm">
                        <ShieldCheck size={18} /> A1-A2 Guarantee
                    </div>
                    <h1 className="text-4xl font-extrabold mb-4">Certification Path</h1>
                    <p className="text-slate-300 max-w-xl text-lg leading-relaxed">
                        Complete the 30-day curriculum to unlock the final assessment. 
                        Pass the exam to receive your verifiable linguistic proficiency certificate.
                    </p>
                </div>
                {/* Decorative background element */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Progress Column */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-slate-900">Current Progress</h2>
                            <span className="text-blue-600 font-bold">{totalProgress}% Completed</span>
                        </div>
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${totalProgress}%` }}></div>
                        </div>
                        <p className="text-sm text-slate-500">
                            You are on Day {userProgress.currentDay} of 30. Keep up the daily streak to reach the goal!
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Requirements Checklist</h2>
                        <div className="space-y-4">
                             {[
                                { 
                                    label: "Complete 30 Daily Lessons", 
                                    done: daysDone >= REQ_DAYS, 
                                    status: `${daysDone}/${REQ_DAYS}` 
                                },
                                { 
                                    label: "Pass 60 Exercises", 
                                    done: exercisesDone >= REQ_EXERCISES, 
                                    status: `${exercisesDone}/${REQ_EXERCISES}` 
                                },
                                { 
                                    label: "Complete 15 Speaking Sessions", 
                                    done: speakingDone >= REQ_SPEAKING, 
                                    status: `${speakingDone}/${REQ_SPEAKING}` 
                                },
                                { 
                                    label: "Pass Final Assessment", 
                                    done: false, 
                                    status: isUnlockable ? "Ready" : "Locked" 
                                }
                             ].map((req, idx) => (
                                 <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                     <div className="flex items-center gap-3">
                                         <div className={`w-6 h-6 rounded-full flex items-center justify-center ${req.done ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-300'}`}>
                                            {req.done ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 bg-slate-300 rounded-full" />}
                                         </div>
                                         <span className={`font-medium ${req.done ? 'text-slate-900' : 'text-slate-600'}`}>{req.label}</span>
                                     </div>
                                     <span className={`text-sm font-semibold px-2 py-1 rounded ${req.done ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>
                                        {req.status}
                                    </span>
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>

                {/* Certificate Preview Column */}
                <div className="space-y-6">
                     <div className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center transition-all duration-500 group ${!isUnlockable ? 'opacity-75 grayscale' : ''}`}>
                        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Award size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Certificate of Completion</h3>
                        <p className="text-slate-500 text-sm mb-6">
                            Verified proof of your A1-level proficiency in Spanish, German, or Japanese.
                        </p>
                        <button 
                            disabled={!isUnlockable}
                            className={`w-full py-2 font-bold rounded-lg flex items-center justify-center gap-2 transition-colors ${isUnlockable ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                        >
                            {isUnlockable ? 'Start Final Exam' : <><Lock size={16} /> Unlock Exam</>}
                        </button>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                            <TrendingUp size={18} /> Why Certification?
                        </h3>
                        <p className="text-blue-800 text-sm leading-relaxed">
                            Our certificate is based on the CEFR framework. It validates your ability to understand and use familiar everyday expressions and basic phrases.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificationScreen;