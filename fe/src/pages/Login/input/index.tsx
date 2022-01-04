import React, { useState, useEffect, useRef, ReactNode } from "react";
import "./index.css";

const Input: React.FC = () => {
  const text = ["User", "Password"];
  const [labelContent, setLabelContent] = useState<ReactNode[]>(text);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const test = text.map((l) =>
      l.split("").map((letter, idx) => (
        <span key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
          {letter}
        </span>
      ))
    );
    setLabelContent(test);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);
  return (
    <div className="container">
      <h1>Please Login</h1>
      <form>
        <div className="form-control">
          <input ref={inputRef} type="text" required />
          <label>{labelContent[0]}</label>
        </div>

        <div className="form-control">
          <input type="password" required />
          <label>{labelContent[1]}</label>
        </div>
        <button className="btn">Login</button>
        <p className="text">
          如果您是访客，则不需要登陆
        </p>
      </form>
    </div>
  );
};

export default Input;
