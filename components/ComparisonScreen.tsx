import React, { useState } from 'react';
import { Play, Settings2, Sparkles, AlertCircle, Book, X, ChevronRight, Layers, Filter } from 'lucide-react';
import LanguageCard from './LanguageCard';
import { INITIAL_SCENARIO } from '../constants';
import { generateComparison } from '../services/geminiService';
import { ComparisonScenario } from '../types';
import { PHRASEBOOK, PhraseCategory } from '../data/phrasebook';

const ComparisonScreen: React.FC = () => {
  const [highlightNouns, setHighlightNouns] = useState(false);
  const [showGrammar, setShowGrammar] = useState(true);
  const [scenario, setScenario] = useState<ComparisonScenario>(INITIAL_SCENARIO);
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptInput, setPromptInput] = useState("");
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Filter State
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>('all');
  
  // Phrasebook State
  const [isPhrasebookOpen, setIsPhrasebookOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory>(PHRASEBOOK[0]);

  const handleGenerate = async (sentenceOverride?: string) => {
    const textToUse = sentenceOverride || promptInput;
    if (!textToUse.trim()) return;
    
    setIsGenerating(true);
    setIsPhrasebookOpen(false); // Close modal if open
    
    const newScenario = await generateComparison(textToUse);
    if (newScenario) {
      setScenario(newScenario);
      setIsInputOpen(false);
      setPromptInput("");
      // Reset filter to all when new content arrives, or keep it? Let's reset to ensure they see everything first.
      setSelectedLanguageId('all');
    } else {
        alert("Failed to generate content. Please ensure API Key is configured.");
    }
    setIsGenerating(false);
  };

  // Helper to split reference sentence for interactivity
  const renderReferenceSentence = () => {
    return scenario.referenceSentence.split(' ').map((word, index) => (
      <span
        key={index}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className={`inline-block cursor-help transition-all duration-200 px-1.5 py-0.5 rounded-lg mx-0.5 ${
          hoveredIndex === index 
            ? 'bg-blue-600 text-white shadow-md scale-110 font-bold z-10 transform ring-2 ring-blue-300' 
            : 'text-slate-900 hover:bg-slate-100 border border-transparent'
        }`}
      >
        {word}
      </span>
    ));
  };

  // Filter languages based on selection
  const displayedLanguages = selectedLanguageId === 'all' 
    ? scenario.languages 
    : scenario.languages.filter(l => l.id === selectedLanguageId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sentence Structure Comparison</h1>
          <p className="text-slate-500 mt-1">Analyze grammatical differences across multiple languages.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
             <button 
                 onClick={() => setIsPhrasebookOpen(true)}
                 className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-medium"
               >
                 <Book size={18} className="text-purple-600" />
                 Phrasebook
               </button>

            {!isInputOpen ? (
                 <button 
                 onClick={() => setIsInputOpen(true)}
                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
               >
                 <Sparkles size={18} />
                 New Sentence
               </button>
            ) : (
                <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm animate-in fade-in slide-in-from-right-4">
                    <input 
                        type="text" 
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        placeholder="Type a sentence..."
                        className="px-3 py-1 outline-none text-sm w-48 md:w-64"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <button 
                        onClick={() => handleGenerate()}
                        disabled={isGenerating}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isGenerating ? '...' : 'Go'}
                    </button>
                    <button 
                        onClick={() => setIsInputOpen(false)}
                        className="px-2 text-slate-400 hover:text-slate-600"
                    >
                        ✕
                    </button>
                </div>
            )}
         
          <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          <button
            onClick={() => setShowGrammar(!showGrammar)}
            className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
              showGrammar ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Settings2 size={16} />
            {showGrammar ? 'Hide Grammar' : 'Show Grammar'}
          </button>
          
          <button
            onClick={() => setHighlightNouns(!highlightNouns)}
            className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
              highlightNouns ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${highlightNouns ? 'bg-white' : 'bg-green-500'}`}></span>
            Nouns
          </button>
        </div>
      </div>

      {/* Phrasebook Modal Overlay */}
      {isPhrasebookOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                            <Book size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Common Phrasebook</h2>
                            <p className="text-sm text-slate-500">Select a sentence to generate a deep comparison.</p>
                        </div>
                    </div>
                    <button onClick={() => setIsPhrasebookOpen(false)} className="text-slate-400 hover:text-slate-600 p-2">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="flex flex-1 overflow-hidden">
                    {/* Categories Sidebar */}
                    <div className="w-1/3 bg-slate-50 border-r border-slate-100 overflow-y-auto p-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Categories</h3>
                        <div className="space-y-1">
                            {PHRASEBOOK.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group ${
                                        selectedCategory.id === cat.id 
                                            ? 'bg-white text-purple-700 shadow-sm ring-1 ring-slate-200' 
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                >
                                    <span>{cat.title}</span>
                                    {selectedCategory.id === cat.id && <ChevronRight size={16} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sentences List */}
                    <div className="flex-1 overflow-y-auto p-6 bg-white">
                         <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            {selectedCategory.title}
                            <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                {selectedCategory.sentences.length} sentences
                            </span>
                         </h3>
                         <div className="grid grid-cols-1 gap-3">
                             {selectedCategory.sentences.map((sentence, idx) => (
                                 <button
                                    key={idx}
                                    onClick={() => handleGenerate(sentence)}
                                    className="text-left p-4 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50 hover:shadow-sm transition-all group"
                                 >
                                     <span className="text-slate-700 font-medium group-hover:text-purple-900 text-lg">"{sentence}"</span>
                                     <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 group-hover:text-purple-600">
                                         <Sparkles size={12} />
                                         Generate 5-language comparison
                                     </div>
                                 </button>
                             ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Reference Sentence Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Reference Sentence (English)</h2>
          <div className="text-2xl font-semibold flex flex-wrap items-center">
             {isGenerating ? (
                <div className="flex items-center gap-2 text-slate-400 animate-pulse">
                    <Sparkles size={24} />
                    <span>Analyzing sentence structure...</span>
                </div>
             ) : (
                renderReferenceSentence()
             )}
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-all active:scale-95 font-medium whitespace-nowrap">
          <Play size={20} fill="currentColor" />
          Play All
        </button>
      </div>

      {/* Language Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
            <Filter size={14} className="mr-1" /> View:
        </div>
        <button
            onClick={() => setSelectedLanguageId('all')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedLanguageId === 'all'
                ? 'bg-slate-800 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
        >
            <Layers size={14} />
            All Languages
        </button>
        {scenario.languages.map((lang) => (
            <button
                key={lang.id}
                onClick={() => setSelectedLanguageId(lang.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedLanguageId === lang.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
            >
                <span>{lang.flag}</span>
                {lang.language}
            </button>
        ))}
      </div>

      {/* Language Grid */}
      <div className={`grid gap-6 ${selectedLanguageId === 'all' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 max-w-3xl mx-auto'}`}>
        {displayedLanguages.map((lang) => (
          <LanguageCard 
            key={lang.id} 
            data={lang} 
            highlightNouns={highlightNouns}
            showGrammar={showGrammar}
            focusedIndex={hoveredIndex}
          />
        ))}
      </div>
      
      {/* Information/Tip */}
      <div className="mt-8 flex items-center gap-3 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm border border-blue-100">
        <AlertCircle size={18} />
        <p>Tip: Hover over words in the reference sentence above to instantly find their translations below.</p>
      </div>
    </div>
  );
};

export default ComparisonScreen;