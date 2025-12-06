import React, { useState, useEffect } from 'react';
import { Volume2, Activity, Square, Loader2 } from 'lucide-react';
import { LanguageData, WordMapping } from '../types';
import { WORD_TYPE_COLORS } from '../constants';

interface LanguageCardProps {
  data: LanguageData;
  highlightNouns: boolean;
  showGrammar: boolean;
  focusedIndex: number | null;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ data, highlightNouns, showGrammar, focusedIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Stop audio if component unmounts
  useEffect(() => {
    return () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
        }
    };
  }, [isPlaying]);
  
  const getWordClass = (word: WordMapping) => {
    // Priority 1: Interactive Hover Matching
    // If this word corresponds to the hovered reference word, give it a strong highlight.
    if (focusedIndex !== null && word.matchingIndex === focusedIndex) {
      return 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100 shadow-xl transform scale-110 z-20 font-bold';
    }

    // Priority 2: Noun Highlighting Mode
    if (highlightNouns) {
      return word.type === 'noun' 
        ? WORD_TYPE_COLORS.noun 
        : 'bg-transparent text-slate-400 border-transparent opacity-60 grayscale'; 
    }
    
    // Priority 3: Default Word Type Coloring
    return WORD_TYPE_COLORS[word.type] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  // Visualizer Helpers
  const getBarHeight = (index: number) => {
    // Stable "random" pattern for the waveform
    const patterns = [35, 50, 25, 60, 40, 70, 30, 80, 45, 90, 55, 100, 65, 85, 40, 60, 30, 50, 25, 40];
    return patterns[index % patterns.length];
  };

  const getComplexityColor = (val: number) => {
     if (val < 40) return 'text-emerald-500';
     if (val < 70) return 'text-amber-500';
     return 'text-rose-500';
  };

  const getComplexityBarColor = (val: number) => {
     if (val < 40) return 'bg-emerald-400';
     if (val < 70) return 'bg-amber-400';
     return 'bg-rose-500';
  };

  const handlePlayAudio = () => {
    if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
    }

    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(data.sentence);
    
    // Map ID to BCP 47 language tag
    const langMap: Record<string, string> = {
        'es': 'es-ES',
        'jp': 'ja-JP',
        'de': 'de-DE',
        'sv': 'sv-SE',
        'fi': 'fi-FI',
        'fr': 'fr-FR',
        'it': 'it-IT'
    };
    
    u.lang = langMap[data.id] || 'en-US';
    u.rate = 0.9; // Slightly slower for clarity
    
    u.onstart = () => setIsPlaying(true);
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);

    // Cancel any currently speaking audio to avoid overlap/queue
    synth.cancel();
    synth.speak(u);
  };

  const complexityColorText = getComplexityColor(data.difficulty);
  const complexityColorBar = getComplexityBarColor(data.difficulty);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-full transition-all hover:shadow-md duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label={data.language}>{data.flag}</span>
          <h3 className="font-bold text-lg text-slate-900">{data.language}</h3>
        </div>
        <button 
          onClick={handlePlayAudio}
          className={`p-2 rounded-full transition-all duration-200 ${
              isPlaying 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
          }`}
          aria-label={isPlaying ? "Stop audio" : "Play audio"}
        >
          {isPlaying ? <Square size={20} fill="currentColor" /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Sentence & Word Mapping */}
      <div className="mb-6 flex-grow">
        <p className="text-lg text-slate-800 mb-4 font-medium leading-relaxed">
            {data.sentence}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {data.wordMapping.map((word, index) => (
            <div 
              key={index}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200 cursor-help group relative ${getWordClass(word)}`}
            >
              {word.text}
              {/* Tooltip for literal translation */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30 shadow-lg">
                {word.translation}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4 mt-auto">
        {/* Grammar Notes */}
        {showGrammar && (
            <div className="mb-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Grammar Notes</h4>
                <ul className="list-disc pl-4 space-y-1">
                {data.grammarNotes.map((note, idx) => (
                    <li key={idx} className="text-sm text-slate-600 leading-snug">{note}</li>
                ))}
                </ul>
            </div>
        )}

        {/* Dynamic Waveform Complexity Meter */}
        <div className="mt-5">
          <div className="flex justify-between items-end mb-3">
             <div className="flex items-center gap-2">
                <Activity size={14} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Structure Complexity</span>
             </div>
             <div className={`flex items-baseline gap-0.5 ${complexityColorText}`}>
                <span className="text-xl font-bold">{data.difficulty}</span>
                <span className="text-xs font-medium opacity-60">/100</span>
             </div>
          </div>
          
          <div className="flex items-end justify-between h-10 gap-1 px-1">
            {Array.from({ length: 20 }).map((_, i) => {
               // 20 segments representing 5% each roughly
               // We determine if this specific bar index is "active" based on the difficulty score
               const threshold = (i / 19) * 100;
               const isActive = data.difficulty >= threshold;
               const height = getBarHeight(i);

               return (
                 <div 
                    key={i} 
                    className={`flex-1 rounded-full transition-all duration-700 ease-out ${isActive ? complexityColorBar : 'bg-slate-100'}`}
                    style={{
                        height: isActive ? `${height}%` : '20%',
                        opacity: isActive ? 1 : 0.5
                    }}
                 />
               )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageCard;