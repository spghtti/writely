import { createContext } from 'react';
import { IAnalysis, IAnalysisContext } from './interfaces';

export const defaultState: IAnalysis = {
  words: 0,
  sentences: 0,
  timeToRead: 0,
  readability: 'Very easy',
  grade: '',
  repeatedWords: [],
};

export const Context = createContext<IAnalysisContext>({
  analysis: defaultState,
  setAnalysis: () => {},
});
