
export interface LineExplanation {
  line: string;
  explanation: string;
}

export interface BigOAnalysis {
  timeComplexity: string;
  spaceComplexity: string;
}

export interface CodeExplanation {
  initialQuestion: string;
  lineByLineExplanation: LineExplanation[];
  bigOAnalysis: BigOAnalysis;
  tradeoffsAndAlternatives: string;
  systemDesignContext: string;
  behavioralQuestions: string[];
}