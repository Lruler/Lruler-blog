import React, { useState, useEffect, useRef, ReactNode } from "react";
import close from "../../../assets/images/close2.png";
import { Login } from "../../../services/api/login";
import Message from "../../../components/message";
import "./index.css";

export interface input {
  userName: string;
  password: string;
}

const Input: React.FC = () => {
  const text = ["User", "Password"];
  const [labelContent, setLabelContent] = useState<ReactNode[]>(text);
  const [userInput, setUseInput] = useState<input>({
    userName: "",
    password: "",
  });

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

  const login = () => {
    Login(userInput).then((res) => {
      if (res.code === 0) Message.success(res.msg);
      else Message.error(res.msg);
    });
  };

  return (
    <div className="container">
        <h1>Please Login</h1>
        <img src={close} alt="" />
      <div className="form-control">
        <input
          onChange={(e) =>
            setUseInput((pre) => ({
              ...pre,
              userName: e.target.value,
            }))
          }
          ref={inputRef}
          type="text"
        />
        <label>{labelContent[0]}</label>
      </div>

      <div className="form-control">
        <input
          type="password"
          onChange={(e) =>
            setUseInput((pre) => ({
              ...pre,
              password: e.target.value,
            }))
          }
        />
        <label>{labelContent[1]}</label>
      </div>
      <button className="btn" onClick={login}>
        Login
      </button>
      <p className="text">如果您是访客，则不需要登陆</p>
    </div>
  );
};

export default Input;
