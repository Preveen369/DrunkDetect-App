
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-slate-300">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text">
        About DrunkDetect & Ethical Considerations
      </h2>
      
      <div className="space-y-8">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-lg">
          <h3 className="text-xl font-semibold text-cyan-300 mb-3">The Research Foundation</h3>
          <p className="leading-relaxed">
            This application is a conceptual prototype inspired by the research paper <strong className="font-semibold text-white">"DrunkDetect: Transformer-Based Facial Emotion Analysis and Intoxication Identification with Masked Learning."</strong> The paper proposes a novel framework using Vision Transformers (ViTs) and Masked Autoencoders (MAE) to simultaneously analyze facial emotions and detect signs of alcohol intoxication by focusing on iris and facial cues.
          </p>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-lg">
          <h3 className="text-xl font-semibold text-cyan-300 mb-3">Ethical Considerations in AI Analysis</h3>
          <p className="mb-4">
            While technologies like DrunkDetect have potential applications in areas like healthcare and public safety, they also raise significant ethical questions that must be carefully considered.
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">1. Privacy and Consent</h4>
              <p className="text-slate-400">Analyzing a person's face, emotions, or physical state is inherently sensitive. In any real-world application, obtaining explicit, informed consent would be a critical and non-negotiable requirement. The potential for surveillance and data misuse is a primary concern.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">2. Accuracy and Bias</h4>
              <p className="text-slate-400">AI models are only as good as the data they are trained on. A model trained on a limited or non-diverse dataset could exhibit significant biases, leading to inaccurate and unfair assessments for certain demographics (e.g., based on ethnicity, gender, or age). A misclassification could have serious real-world consequences.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">3. Context is Key</h4>
              <p className="text-slate-400">Facial expressions are not a universal or definitive indicator of emotion or intoxication. Cultural differences, medical conditions, and individual mannerisms can all influence appearance. Relying solely on a facial scan without understanding the broader context is unreliable and irresponsible.</p>
            </div>
          </div>
        </div>

         <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-lg">
          <h3 className="text-xl font-semibold text-cyan-300 mb-3">Purpose of this Prototype</h3>
          <p className="leading-relaxed">
            This app serves as an interactive tool to:
          </p>
           <ul className="list-disc list-inside space-y-1 text-slate-400 mt-2">
            <li>Visualize the concepts presented in the DrunkDetect research paper.</li>
            <li>Explore how Gemini's advanced AI can be integrated for detailed analysis and conversational AI.</li>
            <li>Promote discussion about the ethical implications and challenges of developing and deploying such technologies.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
