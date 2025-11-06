import React from 'react';
import { AnalyzeIcon, LoadingSpinnerIcon } from './icons';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, onSubmit, isLoading }) => {
  return (
    <div className="flex flex-col h-full bg-base-200 rounded-lg border border-base-300 shadow-lg">
      <div className="p-3 border-b border-base-300 text-content-200 font-medium">
        Enter Code Snippet
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here... (e.g., a function, an algorithm)"
        className="flex-grow p-4 bg-transparent text-content-100 font-mono text-sm resize-none focus:outline-none w-full"
        spellCheck="false"
      />
      <div className="p-3 border-t border-base-300">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-brand-secondary transition-colors disabled:bg-base-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-200 focus:ring-brand-secondary"
        >
          {isLoading ? (
            <>
              <LoadingSpinnerIcon className="w-5 h-5 mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <AnalyzeIcon className="w-5 h-5 mr-2" />
              Explain Code & Ask "Why?"
            </>
          )}
        </button>
      </div>
    </div>
  );
};
