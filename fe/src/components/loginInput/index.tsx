import React, { useState } from "react";
import { useNavigate } from "react-router";
import { changePermission } from "../../router";
import useDelayNav from "../../hooks/useDelayNav";
import useFetch from "../../services/fetch";
import Message from "../message";
import "./index.less";

const LoginInput: React.FC = () => {
  const [pwd, setPwd] = useState("");
  const [isFocus, setIsFoces] = useState(false);
  const nav = useNavigate();
  const login = async (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      const res = await useFetch("login", { password: pwd }, "POST");
      if (res.code === 0) {
        useDelayNav(nav, "/blog/list/page=0");
        localStorage.setItem("token", res.data.token);
        changePermission(true);
      } else Message.error(res.msg);
    }
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
