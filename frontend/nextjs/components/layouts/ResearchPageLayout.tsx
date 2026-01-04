import { ReactNode, useRef, Dispatch, SetStateAction } from "react";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChatBoxSettings } from "@/types/data";

interface ResearchPageLayoutProps {
  children: ReactNode;
  loading: boolean;
  isStopped: boolean;
  showResult: boolean;
  onStop?: () => void;
  onNewResearch: () => void;
  chatBoxSettings: ChatBoxSettings;
  setChatBoxSettings: Dispatch<SetStateAction<ChatBoxSettings>>;
  mainContentRef?: React.RefObject<HTMLDivElement>;
  showScrollButton?: boolean;
  onScrollToBottom?: () => void;
  toastOptions?: object;
}

const defaultToastOptions = {
  style: {
    background: 'rgba(15, 15, 15, 0.95)',
    color: '#e5e5e5',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    backdropFilter: 'blur(20px)',
  },
  duration: 3000,
};

export default function ResearchPageLayout({
  children,
  loading,
  isStopped,
  showResult,
  onStop,
  onNewResearch,
  chatBoxSettings,
  setChatBoxSettings,
  mainContentRef,
  showScrollButton = false,
  onScrollToBottom,
  toastOptions = {}
}: ResearchPageLayoutProps) {
  const defaultRef = useRef<HTMLDivElement>(null);
  const contentRef = mainContentRef || defaultRef;

  return (
    <main className="flex min-h-screen flex-col">
      <Toaster 
        position="bottom-center" 
        toastOptions={{ ...defaultToastOptions, ...toastOptions }}
      />
      
      <Header 
        loading={loading}
        isStopped={isStopped}
        showResult={showResult}
        onStop={onStop || (() => {})}
        onNewResearch={onNewResearch}
      />
      
      <div 
        ref={contentRef}
        className="min-h-[100vh] pt-20"
      >
        {children}
      </div>
      
      {showScrollButton && showResult && (
        <button
          onClick={onScrollToBottom}
          className="fixed bottom-8 right-8 flex items-center justify-center w-11 h-11 
                   rounded-lg border border-white/5 bg-white/5 backdrop-blur-xl
                   hover:border-white/10 hover:bg-white/10
                   text-gray-400 hover:text-gray-300
                   transition-all duration-200 z-50"
          aria-label="Scroll to bottom"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth="2"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </button>
      )}
      
      <Footer setChatBoxSettings={setChatBoxSettings} chatBoxSettings={chatBoxSettings} />
    </main>
  );
}
