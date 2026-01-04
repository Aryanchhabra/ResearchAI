import React, { FC, useRef, useState, useEffect } from "react";
import TypeAnimation from "../../TypeAnimation";

type TInputAreaProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (query: string) => void;
  handleSecondary?: (query: string) => void;
  disabled?: boolean;
  reset?: () => void;
  isStopped?: boolean;
};

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | undefined;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const InputArea: FC<TInputAreaProps> = ({
  promptValue,
  setPromptValue,
  handleSubmit,
  handleSecondary,
  disabled,
  reset,
  isStopped,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const placeholder = "What would you like to research?";

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const adjustHeight = debounce((target: HTMLTextAreaElement) => {
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
  }, 100);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    adjustHeight(target);
    setPromptValue(target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && promptValue.trim()) {
        if (reset) reset();
        handleSubmit(promptValue);
        setPromptValue('');
        resetHeight();
      }
    }
  };

  if (isStopped) {
    return null;
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!disabled && promptValue.trim()) {
            if (reset) reset();
            handleSubmit(promptValue);
            setPromptValue('');
            resetHeight();
          }
        }}
        className="relative"
      >
        {/* Outer glow effect */}
        <div 
          className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 
                     blur-xl opacity-0 transition-opacity duration-500
                     ${isFocused ? 'opacity-100' : ''}`}
        />
        
        {/* Main input container - Large and Centered */}
        <div 
          className={`relative flex items-center gap-4 px-6 py-5 rounded-3xl
                     border-2 border-white/10 bg-white/5 backdrop-blur-2xl
                     transition-all duration-500
                     ${isFocused 
                       ? 'border-teal-500/40 bg-white/10 shadow-2xl shadow-teal-500/20 scale-[1.01]' 
                       : 'hover:border-white/15 hover:bg-white/8'
                     }
                     ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {/* Search icon */}
          <div className="flex-shrink-0">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`transition-colors duration-300 ${isFocused ? 'text-teal-400' : 'text-gray-500'}`}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </div>

          <textarea
            placeholder={placeholder}
            ref={textareaRef}
            disabled={disabled}
            value={promptValue}
            required
            rows={1}
            onKeyDown={handleKeyDown}
            onChange={handleTextareaChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 resize-none bg-transparent outline-none
                     text-lg sm:text-xl text-white placeholder-gray-500
                     font-light leading-relaxed
                     min-h-[32px] max-h-[200px] overflow-y-auto
                     scrollbar-thin"
          />
          
          <button
            disabled={disabled || !promptValue.trim()}
            type="submit"
            className={`flex-shrink-0 w-12 h-12 rounded-2xl
                     transition-all duration-300
                     flex items-center justify-center
                     group/btn
                     ${disabled || !promptValue.trim()
                       ? 'bg-white/5 border border-white/5 opacity-30 cursor-not-allowed'
                       : 'bg-gradient-to-br from-teal-500/30 via-cyan-500/30 to-blue-500/30 border border-teal-500/40 hover:from-teal-500/40 hover:via-cyan-500/40 hover:to-blue-500/40 hover:border-teal-500/60 hover:scale-105 shadow-lg shadow-teal-500/20'
                     }`}
          >
            {disabled ? (
              <div className="w-5 h-5">
                <TypeAnimation />
              </div>
            ) : (
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-white group-hover/btn:text-teal-100 transition-colors"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputArea;
