import React from 'react';

interface HeaderProps {
  loading?: boolean;
  isStopped?: boolean;
  showResult?: boolean;
  onStop?: () => void;
  onNewResearch?: () => void;
  isCopilotMode?: boolean;
}

const Header = ({ loading, isStopped, showResult, onStop, onNewResearch, isCopilotMode }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Centered Logo - Minimal Design */}
        <a href="/" className="absolute left-1/2 transform -translate-x-1/2 group">
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-xl font-extralight text-white tracking-wider">Research</span>
            <span className="text-xl font-light bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI
            </span>
            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </a>
        
        {/* Left side - Empty for balance */}
        <div className="flex-1"></div>
        
        {/* Right side - Actions */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          {loading && !isStopped && (
            <button
              onClick={onStop}
              className="px-5 py-2.5 text-xs font-light text-red-400 hover:text-red-300 
                       border border-red-500/20 hover:border-red-500/40 rounded-full
                       bg-red-500/5 hover:bg-red-500/10
                       transition-all duration-300 backdrop-blur-sm"
            >
              Stop
            </button>
          )}
          {(isStopped || !loading) && showResult && !isCopilotMode && (
            <button
              onClick={onNewResearch}
              className="px-5 py-2.5 text-xs font-light text-teal-400 hover:text-teal-300
                       border border-teal-500/20 hover:border-teal-500/40 rounded-full
                       bg-teal-500/5 hover:bg-teal-500/10
                       transition-all duration-300 backdrop-blur-sm"
            >
              New Research
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
