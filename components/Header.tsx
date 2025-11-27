import React from 'react';
import { AppView } from '../types';
import CameraIcon from './icons/CameraIcon';
import PhotoIcon from './icons/PhotoIcon';
import ChatIcon from './icons/ChatIcon';
import BrainCircuitIcon from './icons/BrainCircuitIcon';
import InfoIcon from './icons/InfoIcon';

interface HeaderProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: AppView.LIVE_ANALYSIS, label: 'Live Analysis', icon: <CameraIcon /> },
    { id: AppView.ANALYZE_PHOTO, label: 'Analyze Photo', icon: <PhotoIcon /> },
    { id: AppView.CHATBOT, label: 'Chat with AI', icon: <ChatIcon /> },
    { id: AppView.ABOUT, label: 'About', icon: <InfoIcon /> },
  ];

  return (
    <header className="bg-slate-900/50 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setActiveView(AppView.HOME)} className="flex items-center group">
             <BrainCircuitIcon />
            <h1 className="text-xl md:text-2xl font-bold ml-3 bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text group-hover:from-cyan-300 group-hover:to-teal-300 transition-colors">
              DrunkDetect
            </h1>
          </button>
          <nav className="hidden md:flex md:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeView === item.id
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden grid grid-cols-4 gap-1 p-2">
           {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 text-xs w-full ${
                  activeView === item.id
                    ? 'bg-cyan-500 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                {item.icon}
                <span className="mt-1 text-center">{item.label}</span>
              </button>
            ))}
        </div>
      </div>
    </header>
  );
};

export default Header;