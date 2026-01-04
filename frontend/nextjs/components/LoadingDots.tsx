import React from 'react';

const LoadingDots = () => {
  return (
    <div className="flex justify-center py-6">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-teal-400/60 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default LoadingDots;
