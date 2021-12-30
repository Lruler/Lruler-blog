import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fullpage from "./components/fullpage";
import './app.css'

const Red: React.FC = () => {
  return <div className="red"></div>
}

const Yellow: React.FC = () => {
  return <div className="yellow"></div>;
};

const Blue: React.FC = () => {
  return <div className="blue"></div>;
};


const App: React.FC = () => {
  return (
    <div>
      <Fullpage>
        <Red />
        <Yellow />
        <Blue />
      </Fullpage>
    </div>
  );
};

export default App;
