import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Sparkles, Languages, Eye, EyeOff } from 'lucide-react';
import { STORIES, Story } from '../data/stories';

const ReadingScreen: React.FC = () => {
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
    const [showAllTranslations, setShowAllTranslations] = useState(false);
    
    // Scroll to top when opening a story
    const handleOpenStory = (story: Story) => {
        setSelectedStory(story);
        setShowAllTranslations(false);
        window.scrollTo(0, 0);
    };

    if (selectedStory) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Navigation & Controls */}
                <div className="sticky top-16 z-20 bg-slate-50/95 backdrop-blur-sm py-4 border-b border-slate-200 mb-8 flex items-center justify-between">
                    <button 
                        onClick={() => setSelectedStory(null)}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-slate-200"
                    >
                        <ArrowLeft size={20} /> Library
                    </button>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setShowAllTranslations(!showAllTranslations)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                showAllTranslations 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
                            }`}
                        >
                            {showAllTranslations ? <Eye size={16} /> : <EyeOff size={16} />}
                            {showAllTranslations ? 'Translations Visible' : 'Hidden Mode'}
                        </button>
                    </div>
                </div>

                {/* Story Header */}
                <div className="text-center mb-12">
                    <span className="text-4xl mb-4 block animate-bounce">{selectedStory.flag}</span>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{selectedStory.originalTitle}</h1>
                    <h2 className="text-xl text-slate-500 font-medium">{selectedStory.title}</h2>
                    <div className="flex items-center justify-center gap-2 mt-4">
                         <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${selectedStory.color}`}>
                            {selectedStory.level}
                         </span>
                         <span className="text-slate-400 text-sm">•</span>
                         <span className="text-slate-500 text-sm">{selectedStory.language}</span>
                    </div>
                </div>

                {/* Story Content */}
                <div className="space-y-6 max-w-2xl mx-auto pb-20">
                    {selectedStory.segments.map((segment, idx) => (
                        <div key={idx} className="group relative">
                            {/* Original Text */}
                            <p className="text-2xl text-slate-800 leading-relaxed font-medium mb-3 group-hover:text-blue-900 transition-colors">
                                {segment.original}
                            </p>
                            
                            {/* Translation Container */}
                            <div className="relative overflow-hidden rounded-lg bg-slate-100 p-4 transition-all duration-300">
                                <p className={`text-slate-600 font-medium transition-all duration-500 ${
                                    showAllTranslations ? 'blur-none opacity-100' : 'blur-sm opacity-40 group-hover:blur-none group-hover:opacity-100'
                                }`}>
                                    {segment.translation}
                                </p>
                                
                                {/* Hint overlay if hidden */}
                                {!showAllTranslations && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                                        <span className="bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-slate-400 shadow-sm border border-slate-200 backdrop-blur-sm">
                                            Hover to reveal
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Footer */}
                <div className="text-center pt-8 border-t border-slate-200">
                    <button 
                         onClick={() => setSelectedStory(null)}
                         className="px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-bold transition-transform active:scale-95"
                    >
                        Finish Story
                    </button>
                </div>
            </div>
        );
    }

    // Library View
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-4 rotate-3 transform shadow-sm">
                    <BookOpen size={32} />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Story Library</h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                    Immerse yourself in culture through reading. Stories are designed with interactive translations to help you learn in context without the stress.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {STORIES.map((story) => (
                    <button 
                        key={story.id}
                        onClick={() => handleOpenStory(story)}
                        className="flex flex-col text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 group h-full"
                    >
                        {/* Cover Area */}
                        <div className={`h-40 ${story.color} relative p-6 flex flex-col justify-between`}>
                            <div className="flex justify-between items-start">
                                <span className="text-4xl filter drop-shadow-md">{story.flag}</span>
                                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                                    {story.level}
                                </span>
                            </div>
                            <h3 className="text-white text-2xl font-bold font-serif leading-tight drop-shadow-sm">
                                {story.originalTitle}
                            </h3>
                        </div>
                        
                        {/* Details */}
                        <div className="p-6 flex-grow flex flex-col">
                            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                {story.title}
                            </h4>
                            <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">
                                {story.description}
                            </p>
                            
                            <div className="flex items-center text-sm font-bold text-indigo-600 group-hover:gap-2 transition-all">
                                <Sparkles size={16} className="mr-2" />
                                Start Reading
                                <Languages size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReadingScreen;