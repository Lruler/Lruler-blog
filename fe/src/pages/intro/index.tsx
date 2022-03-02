import React, { useState } from "react";
import classNames from "classnames";
import "./index.less";

const Intro: React.FC = () => {
  const [left, setLeft] = useState(false);
  const Cls = classNames(
    "intro-page",
    { "hover-left": left },
    { "hover-right": !left }
  );
  const handleLeft = () => {
    setLeft(true);
  };

  const handleRight = () => {
    setLeft(false);
  };
  return (
    <div className={Cls}>
      <div className="split left" onMouseEnter={handleLeft}>
        <h1>My resume</h1>
        <a href="/resume" className="btn" target='_blank'>
          Go!!!
        </a>
      </div>
      <div className="split right" onMouseEnter={handleRight}>
        <h1>My gitHub</h1>
        <a href="https://github.com/Lruler" className="btn" target='_blank'>
          Go!!!
        </a>
      </div>
    </div>
  );
};

export default Intro;
