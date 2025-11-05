import React, { useState, useEffect } from 'react';
import type { CodeExplanation } from '../types';
import { LightbulbIcon, WarningIcon } from './icons';

interface ExplanationOutputProps {
  explanation: CodeExplanation | null;
  isLoading: boolean;
  error: string | null;
}

type Tab = 'Line-by-Line' | 'Big O' | 'Trade-offs' | 'System Design' | 'Behavioral';

const TABS: Tab[] = ['Line-by-Line', 'Big O', 'Trade-offs', 'System Design', 'Behavioral'];

// Helper function to safely parse complexity strings
const renderComplexity = (text: string) => {
    if (!text) {
        return { notation: 'N/A', justification: 'Not provided.' };
    }
    const separatorIndex = text.indexOf(' - ');
    if (separatorIndex === -1) {
        return {
            notation: text,
            justification: "No detailed justification provided."
        };
    }
    return {
        notation: text.substring(0, separatorIndex).trim(),
        justification: text.substring(separatorIndex + 3).trim()
    };
};


export const ExplanationOutput: React.FC<ExplanationOutputProps> = ({ explanation, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Line-by-Line');
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (explanation) {
      setActiveTab('Line-by-Line'); 
      setAnimationKey(key => key + 1);
    }
  }, [explanation]);


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-content-200">
        <div className="flex items-center justify-center space-x-2">
          <span className="w-3 h-3 bg-brand-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 bg-brand-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-3 h-3 bg-brand-secondary rounded-full animate-bounce"></span>
        </div>
        <p className="mt-4 text-lg">Your mentor is thinking...</p>
        <p className="text-sm">Analyzing complexity, context, and trade-offs.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-400">
        <WarningIcon className="w-12 h-12" />
        <h3 className="mt-4 text-lg font-semibold">An Error Occurred</h3>
        <p className="text-center mt-2">{error}</p>
      </div>
    );
  }
  
  if (!explanation) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-content-200 text-center p-8">
          <LightbulbIcon className="w-16 h-16 text-brand-secondary mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Welcome, Future Tech Lead!</h2>
          <p className="max-w-md">
              This is your AI-powered <span className="font-semibold text-brand-secondary">Code Mentor</span>. Paste a code snippet—like a LeetCode solution or a piece of your project—and I'll help you break it down, just like in a pair programming interview.
          </p>
          <p className="mt-4 max-w-md">
              We'll analyze complexity, discuss trade-offs, and even prep for those tricky behavioral questions. Let's build something that gets you hired.
          </p>
      </div>
    );
  }
  
  const renderTabContent = () => {
      switch (activeTab) {
        case 'Line-by-Line':
          return (
            <div className="space-y-4">
              {explanation.lineByLineExplanation.map((item, index) => (
                <div key={index} className="p-3 bg-base-200 rounded-md">
                  <p className="font-mono text-sm text-brand-secondary font-semibold mb-1">Line(s): {item.line}</p>
                  <p className="text-content-100">{item.explanation}</p>
                </div>
              ))}
            </div>
          );
        case 'Big O':
          const time = renderComplexity(explanation.bigOAnalysis.timeComplexity);
          const space = renderComplexity(explanation.bigOAnalysis.spaceComplexity);
          return (
            <div className="space-y-4">
               <div className="p-4 bg-base-200 rounded-md">
                  <h4 className="text-lg font-semibold text-white mb-2">Time Complexity</h4>
                  <p className="font-mono text-brand-secondary mb-2">{time.notation}</p>
                  <p className="text-content-100">{time.justification}</p>
               </div>
               <div className="p-4 bg-base-200 rounded-md">
                  <h4 className="text-lg font-semibold text-white mb-2">Space Complexity</h4>
                  <p className="font-mono text-brand-secondary mb-2">{space.notation}</p>
                  <p className="text-content-100">{space.justification}</p>
               </div>
            </div>
          );
        case 'Trade-offs':
          return <div className="p-4 bg-base-200 rounded-md prose prose-invert max-w-none prose-p:text-content-100" dangerouslySetInnerHTML={{ __html: explanation.tradeoffsAndAlternatives }} />;
        case 'System Design':
          return <div className="p-4 bg-base-200 rounded-md prose prose-invert max-w-none prose-p:text-content-100" dangerouslySetInnerHTML={{ __html: explanation.systemDesignContext }} />;
        case 'Behavioral':
          return (
              <div className="space-y-3">
                  <p className="text-content-200 text-sm">Use these questions to practice articulating your thought process:</p>
                  <ul className="list-disc list-inside space-y-3">
                      {explanation.behavioralQuestions.map((q, index) => (
                         <li key={index} className="p-3 bg-base-200 rounded-md text-content-100">{q}</li> 
                      ))}
                  </ul>
              </div>
          );
        default:
          return null;
      }
  }

  return (
    <div key={animationKey} className="h-full flex flex-col animate-fade-in bg-base-100">
       <div className="flex-shrink-0 p-4 border-b border-base-300 bg-base-200 rounded-t-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Mentor's Opening Question:</h3>
        <p className="text-brand-secondary italic">"{explanation.initialQuestion}"</p>
      </div>

      <div className="flex-shrink-0 border-b border-base-300">
        <div className="flex space-x-1 sm:space-x-2 p-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                activeTab === tab 
                ? 'bg-brand-primary text-white' 
                : 'text-content-200 hover:bg-base-200 hover:text-content-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-grow p-4 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};