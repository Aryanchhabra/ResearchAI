import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import ChatInput from '@/components/ResearchBlocks/elements/ChatInput';
import LoadingDots from '@/components/LoadingDots';
import { Data } from '@/types/data';
import Question from '@/components/ResearchBlocks/Question';
import ChatResponse from '@/components/ResearchBlocks/ChatResponse';

interface CopilotPanelProps {
  question: string;
  chatPromptValue: string;
  setChatPromptValue: Dispatch<SetStateAction<string>>;
  handleChat: (message: string) => void;
  orderedData: Data[];
  loading: boolean;
  isProcessingChat: boolean;
  isStopped: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
  isCopilotVisible?: boolean;
  setIsCopilotVisible?: Dispatch<SetStateAction<boolean>>;
}

const CopilotPanel: React.FC<CopilotPanelProps> = ({
  question,
  chatPromptValue,
  setChatPromptValue,
  handleChat,
  orderedData,
  loading,
  isProcessingChat,
  isStopped,
  bottomRef,
  isCopilotVisible,
  setIsCopilotVisible
}) => {
  const chatMessages = orderedData.filter((data, index) => {
    if (data.type === 'question') {
      return index > 0;
    }
    return data.type === 'chat';
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages.length, loading, isProcessingChat]);

  useEffect(() => {
    if (!chatContainerRef.current) return;
    
    const observer = new MutationObserver(scrollToBottom);
    
    observer.observe(chatContainerRef.current, {
      childList: true,
      subtree: true,
      characterData: true
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col h-full bg-black/60 backdrop-blur-2xl border-l border-white/5 rounded-tl-2xl">
      {/* Panel Header - Smooth & Rounded */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-white/5 bg-white/5 rounded-tl-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500/20 via-cyan-500/20 to-blue-500/20 
                        border border-teal-500/30 flex items-center justify-center shadow-lg shadow-teal-500/10">
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
              className="text-teal-400"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-light text-gray-200 tracking-wide">ResearchAI</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${loading || isProcessingChat ? 'bg-amber-400 animate-pulse' : 'bg-teal-400'}`}></div>
              <span className="text-xs text-gray-500 font-light">
                {loading ? 'researching' : isProcessingChat ? 'thinking' : 'active'}
              </span>
            </div>
          </div>
        </div>
        
        {setIsCopilotVisible && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsCopilotVisible(false);
            }}
            className="w-8 h-8 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 
                     flex items-center justify-center text-gray-400 hover:text-gray-300 
                     transition-all duration-200"
            aria-label="Hide copilot panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Chat Messages - Smooth Scrollable Area */}
      <div 
        ref={chatContainerRef} 
        className="flex-1 overflow-y-auto py-5 px-5 scrollbar-thin"
      >
        {/* Status message - Enhanced Design */}
        <div className="mb-6">
          <div className="p-5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="text-gray-300 text-sm font-light leading-relaxed pt-0.5">
                {loading ? (
                  <p>Working on your research... I&apos;ll analyze the results once they&apos;re complete.</p>
                ) : (
                  <p>I&apos;ve analyzed all the research results and can answer any questions about it. How can I help?</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="space-y-4">
          {chatMessages.map((data, index) => {
            if (data.type === 'question') {
              return (
                <Question key={`question-${index}`} question={data.content} />
              );
            } else if (data.type === 'chat') {
              return (
                <ChatResponse 
                  key={`chat-${index}`} 
                  answer={data.content} 
                  metadata={data.metadata}
                />
              );
            }
            return null;
          })}
          
          {(loading || isProcessingChat) && (
            <div className="flex justify-center py-4">
              <LoadingDots />
            </div>
          )}
        </div>
        
        <div ref={bottomRef} />
      </div>

      {/* Input area - Smooth & Rounded */}
      {!isStopped && (
        <div className="border-t border-white/5 bg-white/5 p-5 rounded-bl-2xl">
          <ChatInput
            promptValue={chatPromptValue}
            setPromptValue={setChatPromptValue}
            handleSubmit={handleChat}
            disabled={loading || isProcessingChat}
          />
        </div>
      )}
    </div>
  );
};

export default CopilotPanel;
