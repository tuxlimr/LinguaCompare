import React, { useState } from 'react';
import { Exercise } from '../types';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface ExerciseRunnerProps {
    exercises: Exercise[];
    onComplete: () => void;
    onCorrectAnswer: () => void;
}

const ExerciseRunner: React.FC<ExerciseRunnerProps> = ({ exercises, onComplete, onCorrectAnswer }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [textInput, setTextInput] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [completed, setCompleted] = useState(false);

    const currentExercise = exercises[currentIndex];

    const handleSubmit = () => {
        let correct = false;
        if (currentExercise.type === 'multiple_choice') {
            correct = selectedOption === currentExercise.correctAnswer;
        } else if (currentExercise.type === 'fill_blank') {
            correct = textInput.trim().toLowerCase() === currentExercise.correctAnswer.toLowerCase();
        }
        
        if (correct) {
            onCorrectAnswer();
        }

        setIsCorrect(correct);
        setIsSubmitted(true);
    };

    const handleNext = () => {
        if (currentIndex < exercises.length - 1) {
            setCurrentIndex(prev => prev + 1);
            resetState();
        } else {
            setCompleted(true);
            onComplete();
        }
    };

    const resetState = () => {
        setSelectedOption(null);
        setTextInput("");
        setIsSubmitted(false);
        setIsCorrect(false);
    };

    if (completed) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-xl text-center h-64">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Practice Complete!</h3>
                <p className="text-green-700">You've successfully finished today's exercises.</p>
                <button 
                    onClick={() => { setCompleted(false); setCurrentIndex(0); resetState(); }}
                    className="mt-6 flex items-center gap-2 text-green-700 font-medium hover:underline"
                >
                    <RotateCcw size={16} /> Review Again
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 w-full">
                <div 
                    className="h-full bg-blue-500 transition-all duration-300" 
                    style={{ width: `${((currentIndex) / exercises.length) * 100}%` }}
                />
            </div>

            <div className="p-6">
                <div className="mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Question {currentIndex + 1} of {exercises.length}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900 mt-2">
                        {currentExercise.question}
                    </h3>
                </div>

                {/* Question Area */}
                <div className="mb-8">
                    {currentExercise.type === 'multiple_choice' && currentExercise.options && (
                        <div className="grid grid-cols-1 gap-3">
                            {currentExercise.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => !isSubmitted && setSelectedOption(option)}
                                    disabled={isSubmitted}
                                    className={`p-4 rounded-lg border text-left transition-all ${
                                        selectedOption === option 
                                            ? 'border-blue-500 bg-blue-50 text-blue-800' 
                                            : 'border-slate-200 hover:bg-slate-50'
                                    } ${isSubmitted && option === currentExercise.correctAnswer ? 'border-green-500 bg-green-50' : ''}
                                      ${isSubmitted && selectedOption === option && !isCorrect ? 'border-red-500 bg-red-50' : ''}
                                    `}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {currentExercise.type === 'fill_blank' && (
                        <input
                            type="text"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            disabled={isSubmitted}
                            placeholder="Type your answer here..."
                            className={`w-full p-4 border rounded-lg outline-none transition-colors ${
                                isSubmitted 
                                    ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                                    : 'border-slate-300 focus:border-blue-500'
                            }`}
                        />
                    )}
                </div>

                {/* Footer / Feedback */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    {!isSubmitted ? (
                        <button
                            onClick={handleSubmit}
                            disabled={currentExercise.type === 'multiple_choice' ? !selectedOption : !textInput}
                            className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            Check Answer
                        </button>
                    ) : (
                        <div className="w-full flex items-center justify-between animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center gap-3">
                                {isCorrect ? (
                                    <div className="flex items-center gap-2 text-green-700 font-medium">
                                        <CheckCircle2 size={24} />
                                        <span>Correct!</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 text-red-600 font-medium">
                                            <XCircle size={24} />
                                            <span>Incorrect</span>
                                        </div>
                                        <span className="text-sm text-slate-500 mt-1">Answer: {currentExercise.correctAnswer}</span>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 flex items-center gap-2 font-medium"
                            >
                                {currentIndex < exercises.length - 1 ? 'Next' : 'Finish'} <ArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExerciseRunner;