import React, { useState } from "react";
import "./index.less";

const LoginInput: React.FC = () => {
  const [pwd, setPwd] = useState("");
  const [isFocus, setIsFoces] = useState(false);
  const login = async (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) console.log(login);
  };
  return (
    <div className="login-input">
      <input
        className={isFocus ? "focus" : undefined}
        value={pwd}
        type="password"
        placeholder="请输入密码"
        onChange={(e) => setPwd(e.target.value)}
        onKeyDown={login}
        onFocus={() => setIsFoces(true)}
        onBlur={() => setIsFoces(false)}
      />
    </div>
  );
};

export default LoginInput;
