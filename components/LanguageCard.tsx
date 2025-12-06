import React from 'react';
import { Volume2, BarChart3 } from 'lucide-react';
import { LanguageData, WordMapping } from '../types';
import { WORD_TYPE_COLORS } from '../constants';

interface LanguageCardProps {
  data: LanguageData;
  highlightNouns: boolean;
  showGrammar: boolean;
  focusedIndex: number | null;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ data, highlightNouns, showGrammar, focusedIndex }) => {
  
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

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-full transition-all hover:shadow-md duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label={data.language}>{data.flag}</span>
          <h3 className="font-bold text-lg text-slate-900">{data.language}</h3>
        </div>
        <button 
          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          aria-label="Play audio"
        >
          <Volume2 size={20} />
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

        {/* Segmented Complexity Meter */}
        <div className="mt-4">
          <div className="flex justify-between items-end mb-2">
             <div className="flex items-center gap-2">
                <BarChart3 size={14} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Structural Complexity</span>
             </div>
             <span className={`text-xs font-bold ${
                 data.difficulty < 40 ? 'text-emerald-600' : data.difficulty < 70 ? 'text-amber-600' : 'text-rose-600'
             }`}>
                {data.difficulty}%
             </span>
          </div>
          
          <div className="flex gap-1 h-2">
            {[...Array(10)].map((_, i) => {
               // 10 segments representing 10% each
               const isActive = data.difficulty >= (i * 10) + 1; // 1-10 triggers index 0, 11-20 index 1 etc.

               let activeColorClass = 'bg-slate-200';
               if (isActive) {
                    if (i < 4) activeColorClass = 'bg-emerald-400';       // 0-30%
                    else if (i < 7) activeColorClass = 'bg-amber-400';    // 40-60%
                    else activeColorClass = 'bg-rose-500';                // 70-100%
               }

               return (
                 <div 
                    key={i} 
                    className={`flex-1 rounded-full transition-all duration-500 ${isActive ? activeColorClass : 'bg-slate-100'}`}
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