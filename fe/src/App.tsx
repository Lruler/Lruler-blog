import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import Blog from "./pages/blog";
import Resume from "./pages/resume";
import Fullpage from "./components/fullpage";

const App: React.FC = () => {
  return (
    <>
      <Fullpage tips={['主页', '个人博客', '我的简历']} navColor="black" color="black">
        <HomePage />
        <Blog />
        <Resume />
      </Fullpage>
    </>
  );
};

export default App;
