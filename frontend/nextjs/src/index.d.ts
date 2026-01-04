declare module 'research-ai-ui' {
  import React from 'react';

  export interface ResearchAIProps {
    apiUrl?: string;
    apiKey?: string;
    defaultPrompt?: string;
    onResultsChange?: (results: any) => void;
    theme?: any;
  }

  export const ResearchAI: React.FC<ResearchAIProps>;
}
