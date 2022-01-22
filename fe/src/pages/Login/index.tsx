import React, { MouseEventHandler, useState } from "react";
import Input from "./input";
import "./index.css";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = (type: number) => {
    if (type === 0 && isLogin) setIsLogin(!isLogin);
    else if (type === 1) setIsLogin(!isLogin);
  };
  return (
    <div className="login-wrapper" onClick={() => handleLogin(0)}>
      {isLogin ? (
        <Input />
      ) : (
        <div className="login-button" onClick={() => handleLogin(1)}>
          登陆
        </div>
      )}
    </div>
  );
};

export default Login;
