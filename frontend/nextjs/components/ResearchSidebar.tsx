import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ResearchHistoryItem } from '../types/data';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface ResearchSidebarProps {
  history: ResearchHistoryItem[];
  onSelectResearch: (id: string) => void;
  onNewResearch: () => void;
  onDeleteResearch: (id: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ResearchSidebar: React.FC<ResearchSidebarProps> = ({
  history,
  onSelectResearch,
  onNewResearch,
  onDeleteResearch,
  isOpen,
  toggleSidebar,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node)) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  const formatTimestamp = (timestamp: number | string | Date | undefined) => {
    if (!timestamp) return 'Unknown time';
    
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return 'Unknown time';
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return 'Unknown time';
    }
  };

  const sidebarVariants = {
    open: { 
      width: 'var(--sidebar-width)', 
      transition: { type: 'spring', stiffness: 250, damping: 25 } 
    },
    closed: { 
      width: 'var(--sidebar-min-width)', 
      transition: { type: 'spring', stiffness: 250, damping: 25, delay: 0.1 } 
    }
  };
  
  const fadeInVariants = {
    hidden: { opacity: 0, transition: { duration: 0.2 } },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sidebar-overlay md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" 
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      
      <motion.div 
        ref={sidebarRef} 
        className="fixed top-0 left-0 h-full sidebar-z-index"
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        style={{
          '--sidebar-width': 'min(320px, 85vw)',
          '--sidebar-min-width': '12px'
        } as React.CSSProperties}
      >
        <div 
          className={`h-full transition-all duration-300 overflow-hidden 
            ${isOpen 
              ? 'bg-black/60 backdrop-blur-xl border-r border-white/5 shadow-2xl p-4' 
              : 'bg-transparent p-0'
            }`}
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="toggle-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-4 top-4 w-10 h-10 flex items-center justify-center rounded-lg 
                         border border-white/5 bg-white/5 backdrop-blur-sm
                         hover:border-white/10 hover:bg-white/10
                         cursor-pointer group transition-all duration-200"
                onClick={toggleSidebar}
                aria-label="Open sidebar"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-gray-400 group-hover:text-gray-300 transition-colors" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="sidebar-content"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={fadeInVariants}
                className="h-full flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-base font-light text-gray-300 tracking-wide">History</h2>
                  <button
                    onClick={toggleSidebar}
                    className="w-8 h-8 flex items-center justify-center rounded-lg 
                             border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10
                             text-gray-400 hover:text-gray-300 transition-all duration-200"
                    aria-label="Close sidebar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={onNewResearch}
                  className="w-full py-2.5 px-4 mb-6 rounded-lg 
                           border border-teal-500/20 bg-teal-500/10 
                           hover:border-teal-500/40 hover:bg-teal-500/20
                           text-teal-400 text-sm font-light
                           transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  New Research
                </button>

                <div className="flex-1 overflow-y-auto scrollbar-thin pr-2">
                  {history.length === 0 ? (
                    <div className="text-center py-12 px-4">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-light text-gray-400 mb-1">No history yet</h3>
                      <p className="text-xs text-gray-600">Start your first research</p>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {history.map((item) => (
                        <motion.li 
                          key={item.id}
                          className="relative rounded-lg transition-all duration-200 overflow-hidden 
                                   border border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10
                                   backdrop-blur-sm group"
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <Link
                            href={`/research/${item.id}`}
                            className="block w-full text-left p-3 pr-10 min-h-[60px] relative"
                            onClick={(e) => {
                              if (!isOpen) {
                                e.preventDefault();
                              }
                              if (isOpen) {
                                onSelectResearch(item.id);
                              }
                              toggleSidebar();
                            }}
                          >
                            <h3 className="font-light truncate text-gray-300 text-sm mb-1.5 group-hover:text-white transition-colors">
                              {item.question}
                            </h3>
                            <p className="text-xs text-gray-600 flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {formatTimestamp(item.timestamp || (item as any).updated_at || (item as any).created_at)}
                            </p>
                          </Link>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteResearch(item.id);
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-lg 
                                     opacity-0 group-hover:opacity-100 transition-opacity 
                                     text-gray-500 hover:text-gray-300 hover:bg-white/5"
                            aria-label="Delete research"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default ResearchSidebar;
