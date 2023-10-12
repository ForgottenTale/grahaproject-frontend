import React from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Main from './components/Main';
import ReactGA from 'react-ga';

const TRACKING_ID = "G-WH5MNM1K3L";
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
