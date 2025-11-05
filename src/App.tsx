import React, {useCallback, useState} from 'react';
import {CodeInput} from './components/CodeInput';
import {ExplanationOutput} from './components/ExplanationOutput';
import {getCodeExplanation} from './services/geminiService';
import type {CodeExplanation} from './types';
import {GithubIcon} from './components/icons';

const App: React.FC = () => {
  const [code, setCode] = useState<string>(`/**
 * House Robber
 * 
 * You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
 * 
 * Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.
 * 
 * Example
 * Input
 * [1, 2, 3, 1]
 * 
 * Output
 * 4
 * 
 * Rob house 1 (1) and then house 3 (3). Total = 1 + 3 = 4.
 * 
 * @param {number[]} nums - An array representing the amount of money in each house.
 * @return {number} - The maximum amount of money you can rob.
 */
const rob = function(nums) {
    if (!nums || nums.length === 0) {
        return 0;
    }
    if (nums.length === 1) {
        return nums[0];
    }

    // Initialize DP variables for the maximum profit up to the previous two houses.
    // 'prevMax' represents dp[i-1] (max profit up to the previous house).
    // 'currMax' represents dp[i] (max profit up to the current house).
    let prevMax = 0; // Max profit up to house i-2
    let currMax = 0; // Max profit up to house i-1

    // Iterate through each house's value
    for (const houseValue of nums) {
        // Option 1: Rob the current house (houseValue)
        // Profit: houseValue + max profit from houses up to i-2 (prevMax)
        
        // Option 2: Skip the current house
        // Profit: max profit from houses up to i-1 (currMax)
        
        // New maximum profit for the current index 'i' (temp)
        const temp = Math.max(houseValue + prevMax, currMax);
        
        // Shift the 'windows' for the next iteration
        // The old currMax (dp[i-1]) becomes the new prevMax (dp[i-2])
        prevMax = currMax;
        
        // The new max profit (dp[i]) becomes the new currMax (dp[i-1])
        currMax = temp;
    }

    // After iterating through all houses, currMax holds the maximum profit.
    return currMax;
};`);
  const [explanation, setExplanation] = useState<CodeExplanation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleExplainCode = useCallback(async () => {
    if (!code.trim()) {
      setError("Please enter some code to explain.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setExplanation(null);

    try {
      const result = await getCodeExplanation(code);
      setExplanation(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred. Check the console for details.");
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-base-100 text-content-100 font-sans">
      <header className="bg-base-200 p-4 border-b border-base-300 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-brand-secondary">Code</span> Mentor AI
        </h1>
        <a href="https://github.com/BeniCheni/code-mentor-ai" target="_blank" rel="noopener noreferrer"
           className="text-content-200 hover:text-white transition-colors">
          <GithubIcon className="w-6 h-6" />
        </a>
      </header>

      <main className="flex flex-col md:flex-row h-[calc(100vh-65px)]">
        <div className="w-full md:w-1/2 p-4 flex flex-col">
          <CodeInput
             code={code}
             setCode={setCode}
             onSubmit={handleExplainCode}
             isLoading={isLoading}
           />
        </div>
        <div className="w-full md:w-1/2 p-4 border-t md:border-t-0 md:border-l border-base-300 overflow-y-auto">
          <ExplanationOutput
            explanation={explanation}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
