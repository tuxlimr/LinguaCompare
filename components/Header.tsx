import React from 'react';
import { LayoutDashboard, SplitSquareHorizontal, CalendarCheck, Award, Settings, UserCircle, Layers } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
    currentView: View;
    onNavigate: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
    const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'compare', label: 'Compare Sentences', icon: <SplitSquareHorizontal size={18} /> },
        { id: 'routine', label: 'Daily Routine', icon: <CalendarCheck size={18} /> },
        { id: 'certification', label: 'Certification Path', icon: <Award size={18} /> },
    ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform rotate-45">
            <div className="transform -rotate-45">
                <Layers className="text-white" size={20} />
            </div>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">LinguaCompare</span>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentView === item.id 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                    {item.label}
                </button>
            ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <Settings size={20} />
          </button>
          <button className="p-1 text-slate-400 hover:text-slate-600 rounded-full transition-colors">
            <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center overflow-hidden border border-orange-300">
                <UserCircle className="text-orange-500 w-full h-full" />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Nav Bar (Simple visual indication for mobile users) */}
      <div className="md:hidden flex justify-around border-t border-slate-100 py-2 bg-white">
        {navItems.map((item) => (
             <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`p-2 rounded-lg ${currentView === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-400'}`}
            >
                {item.icon}
            </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
