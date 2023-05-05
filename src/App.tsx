import { useState } from 'react';
import { Context, defaultState } from './context';
import { Textbox } from './components/Textbox';
import Sidebar from './components/Sidebar';
import quill from './assets/quill.png';
import { IAnalysis } from './interfaces';
import './styles/App.css';

function App() {
  const [analysis, setAnalysis] = useState<IAnalysis>(defaultState);

  return (
    <>
      <div className="logo-wrapper">
        <img src={quill} alt="" />
      </div>
      <div className="textbox-wrapper">
        <Context.Provider value={{ analysis, setAnalysis }}>
          <Textbox />
        </Context.Provider>
      </div>
      <div className="sidebar-wrapper">
        <Context.Provider value={{ analysis, setAnalysis }}>
          <Sidebar />
        </Context.Provider>
      </div>
    </>
  );
}

export default App;
