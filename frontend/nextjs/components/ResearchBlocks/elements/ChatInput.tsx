import React, { FC, useRef, useState, useEffect } from "react";
import TypeAnimation from "../../TypeAnimation";

type TChatInputProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (query: string) => void;
  disabled?: boolean;
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

const ChatInput: FC<TChatInputProps> = ({
  promptValue,
  setPromptValue,
  handleSubmit,
  disabled,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const placeholder = "Any questions about this report?";

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const adjustHeight = debounce((target: HTMLTextAreaElement) => {
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 150)}px`;
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
        handleSubmit(promptValue);
        setPromptValue('');
        resetHeight();
      }
    }
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!disabled && promptValue.trim()) {
            handleSubmit(promptValue);
            setPromptValue('');
            resetHeight();
          }
        }}
        className="relative"
      >
        <div 
          className={`relative flex items-end gap-3 px-4 py-3.5 rounded-2xl
                     border border-white/5 bg-white/5 backdrop-blur-xl
                     transition-all duration-300
                     ${isFocused ? 'border-teal-500/30 bg-white/10 shadow-lg shadow-teal-500/5' : ''}
                     ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
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
                     text-sm text-white placeholder-gray-500
                     font-light leading-relaxed
                     min-h-[24px] max-h-[150px] overflow-y-auto
                     scrollbar-thin"
          />
          
          <button
            disabled={disabled || !promptValue.trim()}
            type="submit"
            className={`flex-shrink-0 w-10 h-10 rounded-xl
                     transition-all duration-200
                     flex items-center justify-center
                     group/btn
                     ${disabled || !promptValue.trim()
                       ? 'bg-white/5 border border-white/5 opacity-30 cursor-not-allowed'
                       : 'bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 hover:from-teal-500/30 hover:to-cyan-500/30 hover:border-teal-500/40 shadow-lg shadow-teal-500/10'
                     }`}
          >
            {disabled ? (
              <div className="w-4 h-4">
                <TypeAnimation />
              </div>
            ) : (
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-teal-400 group-hover/btn:text-teal-300 transition-colors"
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

export default ChatInput;
