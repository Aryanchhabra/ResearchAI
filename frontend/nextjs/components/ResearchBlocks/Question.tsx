import React from 'react';

interface QuestionProps {
  question: string;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className="w-full rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-5 sm:p-6 mb-4">
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 
                      border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-blue-500/10">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="18"
            height="18"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-blue-400"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div className="flex-1 pt-0.5">
          <p className="text-xs font-light text-gray-500 mb-2 tracking-wide">Question</p>
          <p className="text-base text-white font-light leading-relaxed break-words">{question}</p>
        </div>
      </div>
    </div>
  );
};

export default Question;
