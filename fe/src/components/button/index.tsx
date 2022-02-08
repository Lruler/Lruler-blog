import React from "react";
import "./index.less";

interface ButtonProp {
  color?: string;
}

const Button: React.FC<ButtonProp> = ({ children, color = "black" }) => {
  return <div className="lruler-button">{children}</div>;
};

export default Button;
