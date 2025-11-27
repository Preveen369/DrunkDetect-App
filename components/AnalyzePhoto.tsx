
import React, { useState } from 'react';
import { analyzeImageWithGemini } from '../services/geminiService';
import { DetectionResult, Emotion } from '../types';

// A simple utility to parse basic markdown to HTML for better display.
const parseSimpleMarkdown = (text: string): string => {
  if (!text) return '';

  const blocks = text.split(/\n\s*\n/); // Split by one or more empty lines to get paragraphs

  return blocks.map(block => {
    // Handle headings
    if (block.startsWith('### ')) {
      let content = block.substring(4).replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-300 font-semibold">$1</strong>');
      return `<h3 class="text-lg font-semibold text-cyan-200 mt-4 mb-2">${content}</h3>`;
    }
    if (block.startsWith('## ')) {
      let content = block.substring(3).replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-300 font-semibold">$1</strong>');
      return `<h2 class="text-xl font-bold text-cyan-300 mt-5 mb-2">${content}</h2>`;
    }
    
    // Handle horizontal rules
    if (block.trim() === '---') {
        return '<hr class="my-4 border-slate-600" />';
    }

    // Handle paragraphs
    if (block.trim()) {
      const content = block
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-300 font-semibold">$1</strong>')
        .replace(/\n/g, '<br />');
      return `<p class="mb-3 leading-relaxed">${content}</p>`;
    }
    
    return '';
  }).join('');
};


const AnalyzePhoto: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detection, setDetection] = useState<DetectionResult | null>(null);
  const [geminiAnalysis, setGeminiAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setError("File is too large. Please select an image smaller than 4MB.");
        return;
      }
      setError(null);
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDetection(null);
      setGeminiAnalysis('');
    }
  };

  const handleAnalyzeClick = async () => {
    if (!imageFile) {
      setError("Please select an image first.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simulate DrunkDetect analysis
    const emotions: Emotion[] = ['Angry', 'Happy', 'Sad', 'Surprised', 'Neutral', 'Fearful', 'Disgusted'];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const randomIntoxication = Math.random() > 0.6 ? 'Intoxicated' : 'Sober';
    const randomConfidence = Math.random() * (0.98 - 0.75) + 0.75;
    
    setDetection({
      emotion: randomEmotion,
      confidence: randomConfidence,
      intoxication: randomIntoxication,
    });
    
    // Call Gemini for deep analysis
    const fullAnalysis = await analyzeImageWithGemini(imageFile);

    // Extract summary, which should start with **Summary**:
    const summaryIndex = fullAnalysis.lastIndexOf('**Summary**:');
    let analysisToDisplay = fullAnalysis;
    if (summaryIndex !== -1) {
      analysisToDisplay = fullAnalysis.substring(summaryIndex);
    }
    setGeminiAnalysis(parseSimpleMarkdown(analysisToDisplay));
    
    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text">Analyze Photo with Gemini</h2>
      
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700 mb-6">
        <label htmlFor="photo-upload" className="block text-sm font-medium text-slate-300 mb-2">Upload an image of a face:</label>
        <input 
          id="photo-upload"
          type="file" 
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <button 
          onClick={handleAnalyzeClick} 
          disabled={!imageFile || isLoading}
          className="mt-4 w-full md:w-auto px-6 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      
      {isLoading && (
        <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="mt-4 text-slate-300">Gemini is thinking... This may take a moment.</p>
        </div>
      )}

      {(previewUrl || detection || geminiAnalysis) && !isLoading && (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col">
                 {previewUrl && (
                    <div className="mb-6">
                        <img src={previewUrl} alt="Preview" className="rounded-lg shadow-lg w-full object-contain max-h-[400px]" />
                    </div>
                )}
                 {detection && (
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-xl font-bold mb-3 text-cyan-300">Simulated DrunkDetect Result</h3>
                        <div className="flex justify-around text-center">
                            <div>
                                <p className="text-sm text-slate-400">EMOTION</p>
                                <p className="text-2xl font-semibold">{detection.emotion} ({(detection.confidence*100).toFixed(1)}%)</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">STATUS</p>
                                <p className={`text-2xl font-semibold ${detection.intoxication === 'Intoxicated' ? 'text-amber-400' : 'text-green-400'}`}>{detection.intoxication}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {geminiAnalysis && (
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-xl font-bold mb-3 text-cyan-300">Gemini Analysis</h3>
                    <div className="text-slate-300" dangerouslySetInnerHTML={{ __html: geminiAnalysis }} />
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default AnalyzePhoto;
