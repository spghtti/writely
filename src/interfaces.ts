export interface IAnalysis {
  words: number;
  timeToRead: number;
  readability: number;
  writingLevel: string;
  repeatedWords: string[];
}

export interface IAnalysisContext {
  state: IAnalysis;
  setState: (newAnalysis: IAnalysis) => void;
}
