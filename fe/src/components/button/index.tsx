import React from "react";
import classNames from "classnames";
import "./index.less";

interface ButtonProp {
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProp> = ({
  children,
  onClick,
  disabled = false,
}) => {
  const classes = classNames(
    { "lruler-button": !disabled },
    {
      "lruler-button-disabled": disabled,
    }
  );
  return (
    <button disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
