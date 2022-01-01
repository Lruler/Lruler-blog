import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fullpage from "./components/fullpage";
import "./app.css";

const Red: React.FC = () => {
  return <div className="red">red</div>;
};

const Yellow: React.FC = () => {
  return <div className="yellow">yellow</div>;
};

const Blue: React.FC = () => {
  return <div className="blue">blue</div>;
};

const App: React.FC = () => {
  return (
    <>
      <Fullpage tips={['red', 'blue', 'yellow']}>
        <Red />
        <Yellow />
        <Blue />
      </Fullpage>
    </>
  );
};

export default App;
