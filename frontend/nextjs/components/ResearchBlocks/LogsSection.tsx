import LogMessage from './elements/LogMessage';
import { useEffect, useRef } from 'react';

interface Log {
  header: string;
  text: string;
  metadata: any;
  key: string;
}

interface OrderedLogsProps {
  logs: Log[];
}

const LogsSection = ({ logs }: OrderedLogsProps) => {
  const logsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-6 sm:p-8 mt-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-teal-500/20 
                      border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/10">
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
            className="text-cyan-400"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <h3 className="text-sm font-light text-gray-200 tracking-wide">
          Agent Work
        </h3>
      </div>
      <div 
        ref={logsContainerRef}
        className="overflow-y-auto min-h-[200px] max-h-[500px] scrollbar-thin"
      >
        <LogMessage logs={logs} />
      </div>
    </div>
  );
};

export default LogsSection;
