import React from "react";
import "./index.less";

interface ButtonProp {
  onClick?: () => void
  color?: string;
}

const Button: React.FC<ButtonProp> = ({ children, color = "black", onClick } ) => {
  return <div onClick={onClick} className="lruler-button">{children}</div>;
};

export default Button;
