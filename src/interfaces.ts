export interface IAnalysis {
  words: number;
  sentences: number;
  timeToRead: number;
  readability: string | undefined;
  grade: string;
  repeatedWords: string[];
}

export interface IAnalysisContext {
  analysis: IAnalysis;
  setAnalysis: (newAnalysis: IAnalysis) => void;
}
