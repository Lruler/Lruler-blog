import React, { useState } from "react";
import "./index.css";

interface FullpageProps {
  tips?: string[];
}

const Fullpage: React.FC<FullpageProps> = ({ children, tips = [] }) => {
  const pageSum = (children as Array<any>).length;
  const [pageNum, setPageNum] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const handleScroll = (e: React.WheelEvent) => {
    if (isScroll) return false;
    if (e.deltaY > 0) {
      if (pageNum >= pageSum - 1) return false;
      setIsScroll(true);
      setPageNum((pre) => pre + 1);
      setTimeout(() => {
        setIsScroll(false);
      }, 1000);
    } else {
      if (pageNum == 0) return false;
      setIsScroll(true);
      setPageNum((pre) => pre - 1);
      setTimeout(() => {
        setIsScroll(false);
      }, 1000);
    }
  };
  const handlePage = (index: number) => {
    setPageNum(index);
  };
  const nav = Array(pageSum).fill(null);
  return (
    <>
      <div
        onWheel={handleScroll}
        style={{
          transform:
            "translate3d(0px,-" + pageNum * window.innerHeight + "px, 0px)",
        }}
        id="fullpage-wrapper"
      >
        {children}
      </div>
      <div className="fullpage-nav">
        <ul>
          {nav.map((_, index) => (
            <li key={index} onClick={() => handlePage(index)}>
              <div className={index === pageNum ? "active" : "pending"}>
                <span className="nav"></span>
                      {tips.length ? <span className="tips">{tips[index]}</span> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Fullpage;
