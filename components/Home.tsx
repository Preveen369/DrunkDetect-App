
import React from 'react';
import { AppView } from '../types';
import CameraIcon from './icons/CameraIcon';
import PhotoIcon from './icons/PhotoIcon';
import ChatIcon from './icons/ChatIcon';
import BrainCircuitIcon from './icons/BrainCircuitIcon';
import SparklesIcon from './icons/SparklesIcon';


interface HomeProps {
  setActiveView: (view: AppView) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void }> = ({ icon, title, description, onClick }) => (
  <div onClick={onClick} className="relative group p-6 bg-slate-800/50 rounded-xl border-2 border-slate-700 overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/20 hover:shadow-2xl hover:-translate-y-2">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex flex-col items-center text-center">
          <div className="p-3 mb-4 bg-slate-700 rounded-full border border-slate-600 group-hover:border-cyan-500 transition-colors flex items-center justify-center">
              {icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-400 text-sm">{description}</p>
      </div>
  </div>
);


const Home: React.FC<HomeProps> = ({ setActiveView }) => {
  return (
    <div className="max-w-5xl mx-auto text-center px-4">
        {/* Hero Section */}
        <div className="py-10 md:py-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-cyan-400 to-teal-300 text-transparent bg-clip-text">
                Unlocking Facial Insights with AI
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-8">
                Explore a prototype inspired by the DrunkDetect research paper. Experience simulated real-time emotion analysis and delve deeper with Gemini's powerful AI capabilities.
            </p>
            <button
                onClick={() => setActiveView(AppView.LIVE_ANALYSIS)}
                className="px-8 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300"
            >
                Launch Live Analysis
            </button>
        </div>

        {/* Features Section */}
        <div className="py-12">
            <h2 className="text-3xl font-bold mb-10">Explore the Prototype</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <FeatureCard
                    icon={<CameraIcon />}
                    title="Live Analysis"
                    description="Activate your camera for a real-time simulation of emotion and intoxication detection."
                    onClick={() => setActiveView(AppView.LIVE_ANALYSIS)}
                />
                <FeatureCard
                    icon={<PhotoIcon />}
                    title="Analyze a Photo"
                    description="Upload a photo and get a detailed facial analysis powered by Gemini's 'thinking mode'."
                    onClick={() => setActiveView(AppView.ANALYZE_PHOTO)}
                />
                <FeatureCard
                    icon={<ChatIcon />}
                    title="Chat with AI"
                    description="Ask our Gemini-powered guide about the technology, emotions, or related topics."
                    onClick={() => setActiveView(AppView.CHATBOT)}
                />
            </div>
        </div>

        {/* Technology Spotlight */}
        <div className="py-12">
            <h2 className="text-3xl font-bold mb-10">Powered by Advanced Technology</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <div className="flex items-center mb-3">
                        <BrainCircuitIcon />
                        <h3 className="ml-3 text-xl font-bold text-cyan-400">Vision Transformers</h3>
                    </div>
                    <p className="text-slate-400">
                        The core concept is based on Vision Transformers (ViTs), a deep learning model that processes images as sequences, enabling nuanced understanding of facial features.
                    </p>
                </div>
                 <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                     <div className="flex items-center mb-3">
                        <SparklesIcon />
                        <h3 className="ml-3 text-xl font-bold text-cyan-400">Google Gemini</h3>
                    </div>
                    <p className="text-slate-400">
                        This prototype integrates the Gemini family of models for advanced tasks like in-depth image analysis and providing helpful, context-aware responses in the AI chat.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Home;
