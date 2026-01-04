import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { markdownToHtml } from '../../helpers/markdownHelper';
import '../../styles/markdown.css';
import { useResearchHistoryContext } from '../../hooks/ResearchHistoryContext';

export default function Report({ answer, researchId }: { answer: string, researchId?: string }) {
    const [htmlContent, setHtmlContent] = useState('');
    const { getChatMessages } = useResearchHistoryContext();
    const chatMessages = researchId ? getChatMessages(researchId) : [];

    useEffect(() => {
      if (answer) {
        markdownToHtml(answer).then((html) => setHtmlContent(html));
      }
    }, [answer]);
    
    return (
      <div className="w-full rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-6 sm:p-8 mb-6">
        <div className="w-full">
          <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 via-cyan-500/20 to-blue-500/20 
                            border border-teal-500/30 flex items-center justify-center shadow-lg shadow-teal-500/10">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  width="20"
                  height="20"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-teal-400"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-light text-gray-200 tracking-wide">Research Report</h3>
                <p className="text-xs text-gray-600 mt-0.5">Comprehensive analysis with citations</p>
              </div>
            </div>
            {answer && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(answer.trim());
                  toast.success("Copied to clipboard", {
                    style: {
                      background: 'rgba(15, 15, 15, 0.95)',
                      color: '#e5e5e5',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(20px)',
                    },
                  });
                }}
                className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 
                         flex items-center justify-center transition-all duration-200 group"
                aria-label="Copy report"
              >
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-gray-400 group-hover:text-gray-300 transition-colors"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            )}
          </div>
          
          <div className="w-full">
            {answer ? (
              <div 
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }} 
              />
            ) : (
              <div className="flex w-full flex-col gap-3">
                <div className="h-4 w-full animate-pulse rounded-xl bg-white/5" />
                <div className="h-4 w-[85%] animate-pulse rounded-xl bg-white/5" />
                <div className="h-4 w-[90%] animate-pulse rounded-xl bg-white/5" />
                <div className="h-4 w-[70%] animate-pulse rounded-xl bg-white/5" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
