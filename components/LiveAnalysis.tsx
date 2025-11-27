import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DetectionResult, Emotion } from '../types';

const LiveAnalysis: React.FC = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detection, setDetection] = useState<DetectionResult>({
    emotion: 'Analyzing...',
    confidence: 0,
    intoxication: 'Analyzing...',
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Ref to hold the state of our simulated face detection box
  const faceBoxRef = useRef({
    x: 0, y: 0, w: 0, h: 0,
    vx: 0, vy: 0,
    initialized: false,
  });

  const startCamera = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Wait for the video to start playing to get dimensions
        videoRef.current.onloadedmetadata = () => {
            setIsCameraOn(true);
            setIsLoading(false);
        };
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError("Camera access denied. Please allow camera access in your browser settings and refresh the page.");
        } else if (err.name === 'NotFoundError') {
          setError("No camera found. Please ensure a camera is connected and enabled.");
        } else {
          setError("Could not access camera. Please grant permission and try again.");
        }
      } else {
        setError("An unknown error occurred while accessing the camera.");
      }
      setIsCameraOn(false);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    setDetection({ emotion: 'Analyzing...', confidence: 0, intoxication: 'Analyzing...' });
    
    // Reset face box state
    if (faceBoxRef.current) {
      faceBoxRef.current.initialized = false;
    }

    const context = canvasRef.current?.getContext('2d');
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
  };
  
  const handleToggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Simulation logic for emotion/intoxication text
  useEffect(() => {
    let detectionInterval: number | undefined;
    if (isCameraOn) {
      detectionInterval = window.setInterval(() => {
        const emotions: Emotion[] = ['Angry', 'Happy', 'Sad', 'Surprised', 'Neutral', 'Fearful', 'Disgusted'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        const randomIntoxication = Math.random() > 0.85 ? 'Intoxicated' : 'Sober';
        const randomConfidence = Math.random() * (0.98 - 0.75) + 0.75;
        
        setDetection({
            emotion: randomEmotion,
            confidence: randomConfidence,
            intoxication: randomIntoxication,
        });

      }, 2000);
    }
    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    };
  }, [isCameraOn]);
  
  // More realistic, physics-based face detection box drawing logic
  const animationLoop = useCallback(() => {
    if (!isCameraOn || !videoRef.current || !canvasRef.current || videoRef.current.paused || videoRef.current.ended) {
        animationFrameIdRef.current = requestAnimationFrame(animationLoop);
        return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const faceBox = faceBoxRef.current;

    if (ctx && video.videoWidth > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!faceBox.initialized) {
            faceBox.w = canvas.width * 0.4;
            faceBox.h = canvas.height * 0.6;
            faceBox.x = (canvas.width - faceBox.w) / 2;
            faceBox.y = (canvas.height - faceBox.h) / 2;
            faceBox.vx = (Math.random() - 0.5) * 2;
            faceBox.vy = (Math.random() - 0.5) * 2;
            faceBox.initialized = true;
        }
        
        if (Math.random() < 0.02) { 
            faceBox.vx = (Math.random() - 0.5) * 4;
            faceBox.vy = (Math.random() - 0.5) * 4;
        }

        faceBox.x += faceBox.vx;
        faceBox.y += faceBox.vy;

        if (faceBox.x < 10 || faceBox.x + faceBox.w > canvas.width - 10) {
            faceBox.vx *= -0.8;
            faceBox.x = Math.max(10, Math.min(faceBox.x, canvas.width - 10 - faceBox.w));
        }
        if (faceBox.y < 10 || faceBox.y + faceBox.h > canvas.height - 10) {
            faceBox.vy *= -0.8;
            faceBox.y = Math.max(10, Math.min(faceBox.y, canvas.height - 10 - faceBox.h));
        }

        const jitterX = (Math.random() - 0.5) * 2.5;
        const jitterY = (Math.random() - 0.5) * 2.5;

        const isTracking = Math.random() > 0.01; 

        if (isTracking) {
            const { x, y, w, h } = faceBox;

            ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
            ctx.lineWidth = 4;
            ctx.strokeRect(x + jitterX, y + jitterY, w, h);

            ctx.strokeStyle = 'rgba(255, 0, 255, 0.7)';
            ctx.lineWidth = 2;
            const eyeW = w * 0.2;
            const eyeH = h * 0.1;
            const leftEyeX = x + w * 0.2 + jitterX;
            const rightEyeX = x + w * 0.6 + jitterX;
            const eyeY = y + h * 0.3 + jitterY;
            ctx.strokeRect(leftEyeX, eyeY, eyeW, eyeH);
            ctx.strokeRect(rightEyeX, eyeY, eyeW, eyeH);
        }
    }
    
    animationFrameIdRef.current = requestAnimationFrame(animationLoop);
  }, [isCameraOn]);

  useEffect(() => {
    if (isCameraOn) {
        animationFrameIdRef.current = requestAnimationFrame(animationLoop);
    } else {
        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
        }
    }

    return () => {
        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
        }
    };
  }, [isCameraOn, animationLoop]);


  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text">Live Camera Analysis</h2>
      
      <div className="w-full max-w-4xl aspect-video bg-slate-800 rounded-lg shadow-2xl mb-4 relative overflow-hidden border-2 border-slate-700">
        <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover transition-opacity duration-500 ${isCameraOn ? 'opacity-100' : 'opacity-0'}`} muted></video>
        <canvas ref={canvasRef} className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${isCameraOn ? 'opacity-100' : 'opacity-0'}`}></canvas>
        
        {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                <p className="mt-4 text-slate-300">Starting camera...</p>
            </div>
        )}

        {!isCameraOn && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4 text-center">
            {error ? (
                 <>
                    <h3 className="text-xl text-red-400 font-semibold mb-2">Camera Error</h3>
                    <p className="text-slate-300 max-w-md">{error}</p>
                 </>
            ) : (
                <p className="text-xl text-slate-300">Camera is off. Click Start to begin analysis.</p>
            )}
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-4xl">
        <button 
          onClick={handleToggleCamera} 
          disabled={isLoading}
          className={`px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 w-full md:w-auto
            ${isLoading 
              ? 'bg-slate-500 cursor-not-allowed' 
              : isCameraOn 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-cyan-600 hover:bg-cyan-700'
            } text-white`}>
          {isLoading ? 'Please Wait...' : isCameraOn ? 'Stop Analysis' : 'Start Analysis'}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                <h3 className="text-sm font-semibold text-slate-400 uppercase">Emotion</h3>
                <p className="text-2xl font-bold text-cyan-400">{detection.emotion}</p>
                <p className="text-sm text-slate-300">Confidence: {(detection.confidence * 100).toFixed(1)}%</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center">
                <h3 className="text-sm font-semibold text-slate-400 uppercase">Intoxication Status</h3>
                <p className={`text-2xl font-bold ${detection.intoxication === 'Intoxicated' ? 'text-amber-400' : 'text-green-400'}`}>{detection.intoxication}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAnalysis;