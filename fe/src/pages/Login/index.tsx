import React, { useState } from "react";
import Input from "./input";
import "./index.css";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = () => {
    setIsLogin((pre) => !pre);
  };
  return (
    <div className="login-wrapper">
      {isLogin ? <Input /> : <div className="login-button" onClick={handleLogin}>登陆</div>}
    </div>
  );
};

export default Login;
