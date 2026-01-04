import React from 'react';
import SourceCard from "./elements/SourceCard";

export default function Sources({
  sources,
  compact = false,
}: {
  sources: { name: string; url: string }[];
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="max-h-[200px] overflow-y-auto scrollbar-thin">
        <div className="flex w-full flex-wrap gap-2">
          {sources.map((source) => {
            let displayUrl = source.url;
            try {
              const urlObj = new URL(source.url);
              displayUrl = urlObj.hostname.replace(/^www\./, '');
            } catch (e) {
              // If URL parsing fails, use the original URL
            }
            
            return (
              <a 
                key={source.url} 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs 
                         bg-white/5 border border-white/5 rounded-xl
                         text-gray-400 hover:text-gray-300 
                         hover:bg-white/10 hover:border-white/10
                         transition-all duration-200"
                title={source.name}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                {displayUrl}
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 
                      border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-500/10">
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
            className="text-purple-400"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </div>
        <h3 className="text-sm font-light text-gray-200 tracking-wide">
          {sources.length} {sources.length === 1 ? 'Source' : 'Sources'}
        </h3>
      </div>
      <div className="overflow-y-auto max-h-[250px] scrollbar-thin">
        <div className="flex w-full flex-wrap gap-3">
          {sources.length > 0 ? (
            sources.map((source) => (
              <SourceCard source={source} key={source.url} />
            ))
          ) : (
            <>
              <div className="h-20 w-[260px] max-w-sm animate-pulse rounded-xl bg-white/5" />
              <div className="h-20 w-[260px] max-w-sm animate-pulse rounded-xl bg-white/5" />
              <div className="h-20 w-[260px] max-w-sm animate-pulse rounded-xl bg-white/5" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
