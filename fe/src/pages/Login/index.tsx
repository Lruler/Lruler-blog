import React, { useState } from "react";
import Button from "../../components/button";
import Input from "./input";
import "./index.less";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="login-wrapper">
      {isLogin ? <Input /> : null}
      <div className="login-image">
        <div className="login-image-a"></div>
        <div className="login-image-b"></div>
        <div className="login-image-c"></div>
        <div className="login-image-d"></div>
        <p className="login-image-text">LRULER HOME</p>
      </div>
      <Button>登陆</Button>
      {/* <div className="login-button" onClick={handleLogin}>
        登陆
      </div> */}
    </div>
  );
};

export default Login;
