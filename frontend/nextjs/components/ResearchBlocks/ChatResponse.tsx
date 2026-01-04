import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { markdownToHtml } from '../../helpers/markdownHelper';
import '../../styles/markdown.css';
import Sources from './Sources';

interface ChatResponseProps {
  answer: string;
  metadata?: {
    tool_calls?: Array<{
      tool: string;
      query: string;
      search_metadata: {
        query: string;
        sources: Array<{
          title: string;
          url: string;
          content: string;
        }>
      }
    }>
  }
}

export default function ChatResponse({ answer, metadata }: ChatResponseProps) {
    const [htmlContent, setHtmlContent] = useState('');
    
    const hasWebSources = metadata?.tool_calls?.some(
      tool => tool.tool === 'quick_search' && tool.search_metadata?.sources?.length > 0
    );
    
    const webSources = metadata?.tool_calls
      ?.filter(tool => tool.tool === 'quick_search')
      .flatMap(tool => tool.search_metadata?.sources || [])
      .map(source => ({
        name: source.title,
        url: source.url
      })) || [];

    useEffect(() => {
      if (answer) {
        markdownToHtml(answer).then((html) => setHtmlContent(html));
      }
    }, [answer]);
    
    const formattedAnswer = answer.trim() || 'No answer available.';
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(formattedAnswer)
            .then(() => {
                toast.success('Copied to clipboard', {
                  style: {
                    background: 'rgba(15, 15, 15, 0.95)',
                    color: '#e5e5e5',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    backdropFilter: 'blur(20px)',
                  },
                });
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
                toast.error('Failed to copy to clipboard');
            });
    };
  
    return (
      <div className="w-full rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-5 sm:p-6 mb-4">
        <div className="w-full">
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500/20 via-cyan-500/20 to-blue-500/20 
                            border border-teal-500/30 flex items-center justify-center shadow-lg shadow-teal-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="text-sm font-light text-gray-200 tracking-wide">Answer</h3>
            </div>
            <button 
              onClick={copyToClipboard}
              className="w-9 h-9 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 
                       flex items-center justify-center transition-all duration-200 group"
              aria-label="Copy to clipboard"
            >
              <svg 
                width="16" 
                height="16" 
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
          </div>
          
          <div className="w-full">
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
          
          {hasWebSources && webSources.length > 0 && (
            <div className="mt-6 pt-5 border-t border-white/5">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <span className="text-xs font-light text-gray-400">Sources</span>
              </div>
              <Sources sources={webSources} compact={true} />
            </div>
          )}
        </div>
      </div>
    );
}
