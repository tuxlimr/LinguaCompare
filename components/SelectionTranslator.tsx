import React, { useEffect, useState, useRef } from 'react';
import { Languages, X, Loader2, Copy, BookA } from 'lucide-react';
import { translateText } from '../services/geminiService';

export const SelectionTranslator: React.FC = () => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const translatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      // Only trigger if selection exists and is not empty
      if (!selection || selection.toString().trim().length === 0) {
        return; 
      }

      const selectedText = selection.toString().trim();
      if (selectedText) {
        // If clicking inside the translator itself (e.g. to copy), ignore
        if (translatorRef.current && translatorRef.current.contains(selection.anchorNode?.parentElement || null)) {
            return;
        }

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Only show if the selection is visible on screen
        if (rect.width > 0 && rect.height > 0) {
            setText(selectedText);
            setTranslation(null); 
            setPosition({
              x: rect.left + (rect.width / 2),
              y: rect.top - 12 // Position above the selection
            });
            setShow(true);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
       // Close popup if clicking outside
       if (translatorRef.current && !translatorRef.current.contains(e.target as Node)) {
           setShow(false);
           setTranslation(null);
       }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const handleTranslate = async () => {
    setLoading(true);
    const result = await translateText(text);
    setTranslation(result);
    setLoading(false);
  };

  if (!show) return null;

  return (
    <div 
        ref={translatorRef}
        className="fixed z-50 bg-white rounded-xl shadow-2xl border border-slate-200 p-1.5 animate-in fade-in zoom-in-95 duration-200"
        style={{ 
            left: position.x, 
            top: position.y, 
            transform: 'translate(-50%, -100%)',
        }}
    >
        {/* Pointer Arrow */}
        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-slate-200"></div>

        {!translation ? (
            <button 
                onClick={handleTranslate}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm"
            >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Languages size={16} />}
                {loading ? 'Translating...' : 'Translate'}
            </button>
        ) : (
            <div className="w-72 bg-white rounded-lg p-3">
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                        <BookA size={14} />
                        Definition / Translation
                    </div>
                    <button 
                        onClick={() => setShow(false)} 
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded p-1 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
                
                <p className="text-sm text-slate-800 leading-relaxed font-medium mb-3">
                    {translation}
                </p>
                
                <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-slate-400 italic max-w-[150px] truncate">
                        "{text}"
                    </span>
                    <button 
                        className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1.5 font-medium px-2 py-1 rounded hover:bg-slate-50 transition-colors"
                        onClick={() => {
                             navigator.clipboard.writeText(translation);
                             setShow(false);
                        }}
                    >
                        <Copy size={12} /> Copy
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};