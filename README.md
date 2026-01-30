# 😵🍷 DrunkDetect: AI Emotion & Intoxication Analysis
DrunkDetect is an innovative AI-powered web prototype inspired by the IEEE research paper "DrunkDetect: Transformer-Based Facial Emotion Analysis and Intoxication Identification with Masked Learning." It enables users to perform real-time emotion detection and intoxication assessment using facial cues from photos or live camera feeds. Integrated with Google's Gemini AI for chat-based insights and ethical guidance, the app simulates advanced ViT (Vision Transformer) and MAE (Masked Autoencoder) techniques for privacy-aware analysis, consent use.

🔗 **Live Project**: [View DrunkDetect Prototype](https://gen-lang-client-0761378578.web.app)

**📽️ Project Demo**: [View DrunkDetect Prototype Demo](https://jmp.sh/ApPuOGCV)

---

# 🏆 Conference Publication & Certification

We proudly presented this research work at, "**2025 4th International Conference on Sensors and Related Networks (SENNET) - Special Focus on Digital Healthcare**" held on July 24-27, 2025, at VIT University, Vellore, India through **Physical Mode**

Paper-ID with title: **216 - DrunkDetect: Transformer-Based Facial Emotion Analysis and Intoxication Identification with Masked Learning**

- **📄 View IEEE Conference Paper**: 👉 [Click to Open the Research Paper (PDF)](./reports/ieee-paper-261.pdf)

- **🏅 View Presentation Certificate**: 👉 [Click to Open Presentation Certificate (PDF)](./reports/presented-certificate-261.pdf)

- **🌐 IEEE Xplore Publication Link**: 👉 [Click to Open Paper's DOI Link](https://doi.org/10.1109/SENNET64220.2025.11135959)

---

## 🚀 Core Features
- 📸 **Live Analysis**: Activate your camera for real-time emotion and intoxication detection, with confidence scores and status updates (e.g., "Analyzing...").
- 🖼️ **Analyze Photo**: Upload facial images for Gemini-powered analysis, detecting emotions and subtle intoxication signs like iris changes.
- 💬 **Chat with AI**: Interact with a Gemini 1.5 Pro assistant for explanations on app functionality, research science, emotions, or ethical queries.
- ℹ️ **About & Ethics**: Detailed overview of the research foundation, including privacy, consent, and non-negotiable safeguards against misuse.
- 🎯 **Ethical Focus**: Built-in reminders for informed consent, data minimization, and surveillance risks to promote responsible AI deployment.

---
## 🛠️ Built With
- **Google AI Studio** – Prototyping platform for rapid AI app development
- **Gemini 1.5 Pro** – Advanced multimodal AI for image analysis, chat, and reasoning
- **Web Technologies** – HTML/CSS/JS for responsive UI; camera API for live feeds
- **Research Integration** – Simulated ViT/MAE models based on IEEE paper for masked learning

---
## 🧠 How It Works
1. Access the app via AI Studio link or run locally to view the dashboard with tabs: Live Analysis, Analyze Photo, Chat with AI, About.
2. For photo analysis: Upload an image, then click "Analyze" to process facial features with Gemini, displaying emotion/intoxication insights.
3. For live analysis: Click "Start" to enable camera; the app simulates real-time detection with progress bars and results.
4. Chat with the AI: Ask questions like "How does intoxication detection work?" for guided responses on ViTs, ethics, or usage.
5. Review the About section for research details and ethical guidelines, ensuring all analyses prioritize user privacy.

---

## 🙋‍♂️ Team & Contributors

- **Lead Developers**: Preveen S, Johnson J
- **Contributors**: Gowtham R, Purushothaman C

---
## 🧪 Setup & Installation
### 📋 Prerequisites
- Node.js (v18 or higher)
- A Gemini API key (free from Google AI Studio)

```bash
git clone https://github.com/Preveen369/DrunkDetect-App.git
cd DrunkDetect-App
```

### 🧑‍💻 Steps to run locally
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Set API key**: Create `.env.local` and add `GEMINI_API_KEY=your_key_here`.
3. **Start the dev server**
   ```bash
   npm run dev
   ```
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

For production: Build with `npm run build` and deploy to Vercel/Netlify. View the hosted prototype in [Google AI Studio](https://aistudio.google.com/app/prompts?state=%7B%22ids%22:%5B%221_h7O7jsYsMMcxlK2l4aQSj_B-CBAN8m_%22%5D,%22action%22:%22open%22,%22userId%22:%22111062033513863225413%22,%22resourceKeys%22:%7B%7D%7D&usp=sharing). Note: Ethical use only—obtain consent for any real-world facial analysis!




