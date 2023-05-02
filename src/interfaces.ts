export interface IAnalysis {
  words: number;
  timeToRead: number;
  readability: string;
  readingLevel: number;
  repeatedWords: string[];
}

export interface IAnalysisContext {
  analysis: IAnalysis;
  setAnalysis: (newAnalysis: IAnalysis) => void;
}
