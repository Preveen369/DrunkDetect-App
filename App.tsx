import React, { useState } from 'react';
import LiveAnalysis from './components/LiveAnalysis';
import AnalyzePhoto from './components/AnalyzePhoto';
import ChatBot from './components/ChatBot';
import Header from './components/Header';
import About from './components/About';
import Home from './components/Home';
import { AppView } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.HOME);

  const renderView = () => {
    switch (activeView) {
      case AppView.HOME:
        return <Home setActiveView={setActiveView} />;
      case AppView.LIVE_ANALYSIS:
        return <LiveAnalysis />;
      case AppView.ANALYZE_PHOTO:
        return <AnalyzePhoto />;
      case AppView.CHATBOT:
        return <ChatBot />;
       case AppView.ABOUT:
        return <About />;
      default:
        return <Home setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        {renderView()}
      </main>
      <footer className="text-center p-4 text-s text-slate-500">
        <p>DrunkDetect Prototype done by Preveen S, Gowtham R, Johnson J, Purushothaman C💖</p>
      </footer>
    </div>
  );
};

export default App;