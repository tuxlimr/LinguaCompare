import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Volume2, RefreshCw } from 'lucide-react';

interface SpeakingPracticeProps {
    sentence: string;
    onComplete: () => void;
}

const SpeakingPractice: React.FC<SpeakingPracticeProps> = ({ sentence, onComplete }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedText, setRecordedText] = useState<string | null>(null);
    const [score, setScore] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = 'en-US'; // Default to English for the demo, would match target language in real app
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setRecordedText(transcript);
                calculateMockScore(transcript);
                setIsRecording(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setError("Microphone access blocked or not supported.");
                setIsRecording(false);
            };
            
            recognitionRef.current.onend = () => {
                setIsRecording(false);
            };
        } else {
            setError("Speech recognition is not supported in this browser.");
        }
    }, [sentence]);

    const calculateMockScore = (input: string) => {
        // Simple Levenshtein-like simulation for demo purposes
        // In a real app, this would use the Backend Assessment API
        const target = sentence.toLowerCase().replace(/[.,!]/g, '');
        const actual = input.toLowerCase().replace(/[.,!]/g, '');
        
        let calculatedScore = 0;
        if (actual === target) {
            calculatedScore = 100;
        } else if (actual.includes(target) || target.includes(actual)) {
            calculatedScore = 80;
        } else {
            calculatedScore = Math.floor(Math.random() * 40) + 40;
        }
        
        setScore(calculatedScore);
        if (calculatedScore >= 70 && !isSuccess) {
            setIsSuccess(true);
            onComplete();
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
        } else {
            setError(null);
            setRecordedText(null);
            setScore(null);
            try {
                recognitionRef.current?.start();
                setIsRecording(true);
            } catch (e) {
                console.error(e);
                setError("Could not start recording.");
            }
        }
    };

    return (
        <div className={`bg-white rounded-xl border p-6 flex flex-col items-center text-center transition-colors ${isSuccess ? 'border-green-200 bg-green-50' : 'border-slate-200'}`}>
            <div className="mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Read Aloud</span>
                <h2 className="text-2xl font-semibold text-slate-900 mt-2 mb-4">"{sentence}"</h2>
                <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mx-auto text-sm font-medium bg-blue-50 px-3 py-1 rounded-full">
                    <Volume2 size={16} /> Listen to Reference
                </button>
            </div>

            {/* Recording Visualizer (Mock) */}
            <div className="h-24 w-full max-w-md bg-white/50 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden border border-slate-100">
                {isRecording ? (
                    <div className="flex items-center gap-1 h-12">
                        {[1, 2, 3, 4, 5, 4, 3, 2].map((h, i) => (
                            <div 
                                key={i} 
                                className="w-2 bg-red-500 rounded-full animate-pulse" 
                                style={{ height: `${h * 20}%`, animationDelay: `${i * 0.1}s` }} 
                            />
                        ))}
                    </div>
                ) : score !== null ? (
                    <div className="flex flex-col items-center">
                         <div className={`text-4xl font-bold ${score > 80 ? 'text-green-500' : 'text-orange-500'}`}>
                            {score}%
                         </div>
                         <span className="text-xs text-slate-400">Pronunciation Score</span>
                    </div>
                ) : (
                    <span className="text-slate-400 text-sm">Tap mic to start</span>
                )}
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            
            {recordedText && (
                 <div className="mb-6 text-sm text-slate-600 bg-white/80 px-4 py-2 rounded-lg">
                    You said: <span className="font-medium text-slate-900">"{recordedText}"</span>
                 </div>
            )}

            <button
                onClick={toggleRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    isRecording 
                    ? 'bg-red-500 hover:bg-red-600 scale-110' 
                    : isSuccess 
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {isRecording ? <Square size={24} className="text-white fill-current" /> : <Mic size={28} className="text-white" />}
            </button>
            
            {score !== null && !isSuccess && (
                <button 
                    onClick={() => { setScore(null); setRecordedText(null); }}
                    className="mt-4 text-slate-400 hover:text-slate-600 flex items-center gap-2 text-sm"
                >
                    <RefreshCw size={14} /> Try Again
                </button>
            )}
        </div>
    );
};

export default SpeakingPractice;