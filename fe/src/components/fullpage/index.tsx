import React, { useEffect } from "react";
import "./index.css";

const PageItem: React.FC = () => {
  return <></>;
};

const Fullpage: React.FC = ({ children }) => {
  const handleScroll = () => {
    console.log(111);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return <div className="fullpage-wrapper">{children}</div>;
};

export default Fullpage;
