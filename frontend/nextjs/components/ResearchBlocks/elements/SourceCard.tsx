import { useState, useMemo } from "react";

const SourceCard = ({ source }: { source: { name: string; url: string } }) => {
  const [imageSrc, setImageSrc] = useState(`https://www.google.com/s2/favicons?domain=${source.url}&sz=128`);

  const handleImageError = () => {
    setImageSrc("/img/globe.svg");
  };
  
  const formattedUrl = useMemo(() => {
    try {
      const urlObj = new URL(source.url);
      return urlObj.hostname.replace(/^www\./, '');
    } catch (e) {
      return source.url.length > 50 ? source.url.substring(0, 50) + '...' : source.url;
    }
  }, [source.url]);

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 
               backdrop-blur-sm px-4 py-3 min-w-[260px] max-w-[300px]
               hover:border-white/10 hover:bg-white/10
               transition-all duration-200 group"
    >
      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/5 border border-white/5 
                    flex items-center justify-center overflow-hidden">
        <img
          src={imageSrc}
          alt={source.url}
          className="w-7 h-7 object-contain"
          onError={handleImageError}
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <h6 className="line-clamp-2 text-sm font-light text-white leading-snug">
          {source.name}
        </h6>
        <p className="truncate text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
          {formattedUrl}
        </p>
      </div>
      <svg 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-gray-600 group-hover:text-gray-400 transition-colors flex-shrink-0"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    </a>
  );
};

export default SourceCard;
