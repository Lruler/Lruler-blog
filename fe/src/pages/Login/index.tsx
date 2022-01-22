import React, { useState } from "react";
import close from "../../assets/images/close2.png";
import Input from "./input";
import "./index.css";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="login-wrapper">
      {isLogin ? (
        <Input />
      ) : (
        <div className="login-button" onClick={handleLogin}>
          登陆
        </div>
      )}
    </div>
  );
};

export default Login;
