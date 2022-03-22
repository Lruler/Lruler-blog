import React, { useState } from "react";
import LoginInput from "../../components/loginInput";
import LinkBtn from "../../components/linkBtn";
import "./index.less";

const Login: React.FC = () => {
  const [index, setIndex] = useState(false);
  const rotate = () => {
    setIndex(!index);
  };
  // 每当点击按钮的时候，index的值就会发生变化，如果index为0的话，那么点击的时候index变为1，反之变为0
  // 当index的值为0时，按钮里的球划到右边，并且将右边字的透明度变为1，下面的登录卡旋转180度，为注册
  // 当index的值为1时，按钮里的球划到左边，并且将右边字的透明度变为0.5，下面的登录卡旋转回0度，为登录
  return (
    <div className="login-page">
      <div className="shell">
        <div className="controller">
          <span className="off" style={{ opacity: index ? 0.2 : 1 }}>
            Ruler
          </span>
          <div className="button" onClick={rotate}>
            <div className="ball" style={{ left: index ? `61%` : 0 }}></div>
          </div>
          <span className="on" style={{ opacity: !index ? 0.2 : 1 }}>
            Visitor
          </span>
        </div>
        <div
          className="layer"
          style={{ transform: index ? `rotateY(180deg)` : `rotate(0deg)` }}
        >
          <div className="login" style={{ opacity: index ? 0 : 1 }}>
            <LoginInput />
          </div>
          <div className="look" style={{ opacity: index ? 1 : 0 }}>
            <LinkBtn
              link="/blog/list/page=0"
              text="Blog"
              icon="book"
              isBlank={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
