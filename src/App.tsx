import { useState, createContext } from 'react';
import Textbox from './components/Textbox';
import Sidebar from './components/Sidebar';
import quill from './assets/quill.png';
import AnalysisProps from './interfaces';
import './styles/App.css';

const defaultState = {
  words: 12,
  timeToRead: undefined,
  readability: undefined,
  writingLevel: undefined,
  repeatedWords: undefined,
};

const AnalysisContext = createContext<AnalysisProps>(defaultState);

function App() {
  return (
    <>
      <div className="logo-wrapper">
        <img src={quill} alt="" />
      </div>
      <div className="textbox-wrapper">
        <Textbox />
      </div>
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
    </>
  );
}

export default App;
