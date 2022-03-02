import React, { useState } from "react";
import classNames from "classnames";
import "./index.less";

const Blog: React.FC = () => {
  const [left, setLeft] = useState(false);
  const Cls = classNames(
    "intro-page",
    { "hover-left": left },
    { "hover-right": !left }
  );
  // const left = document.querySelector(".left");
  // const right = document.querySelector(".right");
  // const container = document.querySelector(".container");

  // left.addEventListener("mouseenter", () =>
  //   container.classList.add("hover-left")
  // );
  // left.addEventListener("mouseleave", () =>
  //   container.classList.remove("hover-left")
  // );

  // right.addEventListener("mouseenter", () =>
  //   container.classList.add("hover-right")
  // );
  // right.addEventListener("mouseleave", () =>
  //   container.classList.remove("hover-right")
  // );
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
        <a href="" className="btn">
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

export default Blog;
