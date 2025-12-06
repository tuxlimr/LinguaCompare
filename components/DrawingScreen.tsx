import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Palette, Square, Pen, Eraser, Download, Trash2, ChevronDown, MousePointer2 } from 'lucide-react';

// --- Types & Constants ---
type Tool = 'pen' | 'eraser' | 'rectangle';
type StyleContext = 'stroke' | 'fill';

const COLORS = [
  '#000000', '#475569', '#ef4444', '#f97316', '#f59e0b', 
  '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', 
  '#8b5cf6', '#d946ef', '#f43f5e', '#ffffff'
];

// --- Utilities ---
// Simple debounce implementation for the slider
const debounce = (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

const DrawingScreen: React.FC = () => {
    // --- State ---
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    
    // Style Context Logic (Phase 4.1)
    // We maintain separate states but use activeProperty to decide which one the picker updates
    const [activeProperty, setActiveProperty] = useState<StyleContext>('stroke');
    const [selectedStrokeColor, setSelectedStrokeColor] = useState('#000000');
    const [selectedFillColor, setSelectedFillColor] = useState('transparent'); // Default 'paper'
    
    const [strokeWidth, setStrokeWidth] = useState(3);
    const [activeTool, setActiveTool] = useState<Tool>('pen');
    
    // Mini-Picker Logic (Phase 4.2)
    const [isMiniPickerOpen, setIsMiniPickerOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    // Canvas History for undo (simplified for this demo)
    const [startPos, setStartPos] = useState<{x: number, y: number} | null>(null);
    const [snapshot, setSnapshot] = useState<ImageData | null>(null);

    // --- Effects ---

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = canvas.parentElement?.clientWidth || 800;
            canvas.height = 600;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                // Set initial background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                setContext(ctx);
            }
        }
    }, []);

    // Phase 4.2: Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsMiniPickerOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // --- Logic ---

    // Phase 4.1: Style Context Switching
    const handleColorSelect = (color: string) => {
        if (activeProperty === 'stroke') {
            setSelectedStrokeColor(color);
        } else {
            setSelectedFillColor(color);
            // If we are in freehand mode, updating fill might also clear/set background
            // For this specific 'Scratchpad' use-case, let's say Fill = Background
            if (context && canvasRef.current) {
                context.save();
                context.fillStyle = color;
                context.globalCompositeOperation = 'destination-over';
                context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                context.restore();
            }
        }
        setIsMiniPickerOpen(false);
    };

    // Phase 4.3: Debounced Slider Input
    const debouncedSetWidth = useCallback(
        debounce((val: number) => {
            // In a more complex app, this might trigger a heavy re-render or canvas state update
            // Here we just log it to demonstrate the hook, but state updates directly for UI responsiveness
            console.log("Heavy calculation for width:", val); 
        }, 100),
        []
    );

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setStrokeWidth(val);
        debouncedSetWidth(val);
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!context) return;
        const { offsetX, offsetY } = e.nativeEvent;
        
        setIsDrawing(true);
        setStartPos({ x: offsetX, y: offsetY });
        
        // Save snapshot for shapes
        if (activeTool === 'rectangle') {
            setSnapshot(context.getImageData(0, 0, context.canvas.width, context.canvas.height));
        }

        context.beginPath();
        context.moveTo(offsetX, offsetY);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !context || !startPos) return;
        const { offsetX, offsetY } = e.nativeEvent;

        if (activeTool === 'pen' || activeTool === 'eraser') {
            context.strokeStyle = activeTool === 'eraser' ? (activeProperty === 'fill' ? selectedFillColor : '#ffffff') : selectedStrokeColor;
            context.lineWidth = strokeWidth;
            context.lineTo(offsetX, offsetY);
            context.stroke();
        } else if (activeTool === 'rectangle' && snapshot) {
            // Restore snapshot to avoid trails
            context.putImageData(snapshot, 0, 0);
            context.beginPath();
            context.strokeStyle = selectedStrokeColor;
            context.lineWidth = strokeWidth;
            context.rect(startPos.x, startPos.y, offsetX - startPos.x, offsetY - startPos.y);
            context.stroke();
            // If we have a fill color (not transparent/white default for shapes logic), fill it
            if (selectedFillColor !== 'transparent') {
                context.fillStyle = selectedFillColor;
                context.fill();
            }
        }
    };

    const stopDrawing = () => {
        if (context) context.closePath();
        setIsDrawing(false);
        setSnapshot(null);
    };

    const clearCanvas = () => {
        if (context && canvasRef.current) {
            context.fillStyle = '#ffffff'; // Reset to white
            context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    const downloadCanvas = () => {
        const link = document.createElement('a');
        link.download = 'practice-session.png';
        link.href = canvasRef.current?.toDataURL() || '';
        link.click();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Character Practice Pad</h1>
                <p className="text-slate-500 mt-1">Practice writing characters (Kanji, Kana, etc.) with the digital ink tool.</p>
            </div>

            {/* Editor Container */}
            <div className="flex-grow flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                
                {/* Top Toolbar */}
                <div className="h-16 border-b border-slate-200 bg-slate-50 flex items-center justify-between px-4">
                    
                    <div className="flex items-center gap-4">
                        {/* Tool Group */}
                        <div className="flex bg-white rounded-lg border border-slate-200 p-1">
                            <button 
                                onClick={() => setActiveTool('pen')}
                                className={`p-2 rounded ${activeTool === 'pen' ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
                                title="Pen Tool (B1)"
                            >
                                <Pen size={18} />
                            </button>
                            <button 
                                onClick={() => setActiveTool('rectangle')}
                                className={`p-2 rounded ${activeTool === 'rectangle' ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
                                title="Shape Tool (B2)"
                            >
                                <Square size={18} />
                            </button>
                            <button 
                                onClick={() => setActiveTool('eraser')}
                                className={`p-2 rounded ${activeTool === 'eraser' ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
                                title="Eraser"
                            >
                                <Eraser size={18} />
                            </button>
                        </div>

                        <div className="w-px h-8 bg-slate-300 mx-2" />

                        {/* Phase 4.1: Style Context Switcher */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400 uppercase">Edit:</span>
                            <div className="flex bg-white rounded-lg border border-slate-200 p-0.5">
                                <button
                                    onClick={() => setActiveProperty('stroke')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                                        activeProperty === 'stroke' 
                                            ? 'bg-slate-800 text-white shadow-sm' 
                                            : 'text-slate-500 hover:text-slate-900'
                                    }`}
                                >
                                    Stroke
                                </button>
                                <button
                                    onClick={() => setActiveProperty('fill')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                                        activeProperty === 'fill' 
                                            ? 'bg-slate-800 text-white shadow-sm' 
                                            : 'text-slate-500 hover:text-slate-900'
                                    }`}
                                >
                                    Fill
                                </button>
                            </div>
                        </div>

                        {/* Phase 4.2: Mini-Color Picker Dropdown */}
                        <div className="relative" ref={pickerRef}>
                            <button
                                onClick={() => setIsMiniPickerOpen(!isMiniPickerOpen)}
                                className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                            >
                                <div 
                                    className="w-6 h-6 rounded border border-slate-200 shadow-sm"
                                    style={{ backgroundColor: activeProperty === 'stroke' ? selectedStrokeColor : selectedFillColor }}
                                />
                                <ChevronDown size={14} className="text-slate-400" />
                            </button>

                            {isMiniPickerOpen && (
                                <div className="absolute top-full left-0 mt-2 p-3 bg-white rounded-xl shadow-xl border border-slate-200 z-50 w-48 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="grid grid-cols-5 gap-2">
                                        {COLORS.map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => handleColorSelect(c)}
                                                className="w-6 h-6 rounded-full border border-slate-100 hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-blue-200"
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                        <button
                                            onClick={() => handleColorSelect('transparent')}
                                            className="w-6 h-6 rounded-full border border-slate-200 hover:scale-110 transition-transform flex items-center justify-center bg-slate-50"
                                            title="Transparent"
                                        >
                                            <div className="w-4 h-0.5 bg-red-400 rotate-45"></div>
                                        </button>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-center text-slate-400">
                                        Editing: <span className="font-bold text-slate-600 capitalize">{activeProperty}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Stroke Width Slider */}
                        <div className="flex items-center gap-2 ml-2">
                            <span className="text-xs text-slate-400">Size</span>
                            <input 
                                type="range" 
                                min="1" 
                                max="20" 
                                value={strokeWidth}
                                onChange={handleWidthChange}
                                className="w-24 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button onClick={clearCanvas} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Clear Canvas">
                            <Trash2 size={20} />
                        </button>
                        <button onClick={downloadCanvas} className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Download">
                            <Download size={20} />
                        </button>
                    </div>
                </div>

                {/* Canvas Area (Phase 4.3: CSS Containment) */}
                <div className="flex-grow bg-slate-100 relative overflow-hidden cursor-crosshair" style={{ contain: 'layout size' }}>
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default DrawingScreen;