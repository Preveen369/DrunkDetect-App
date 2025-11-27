
export enum AppView {
  HOME = 'home',
  LIVE_ANALYSIS = 'live',
  ANALYZE_PHOTO = 'photo',
  CHATBOT = 'chat',
  ABOUT = 'about',
}

export type Emotion = 'Angry' | 'Happy' | 'Sad' | 'Surprised' | 'Neutral' | 'Fearful' | 'Disgusted';
export type IntoxicationStatus = 'Sober' | 'Intoxicated' | 'Analyzing...';

export interface DetectionResult {
  emotion: Emotion | 'Analyzing...';
  confidence: number;
  intoxication: IntoxicationStatus;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}
