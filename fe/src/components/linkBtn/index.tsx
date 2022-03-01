import React from "react";
import classNames from "classnames";
import "./index.less";

interface LinkProps {
  link: string;
  icon: string;
  text: string;
  color?: string
}

const LinkBtn: React.FC<LinkProps> = ({ link, icon, text, color='white' }) => {
  const classes = classNames("fa", `fa-${icon}`);

  return (
    <div className="link-btn" data-color={color}>
      <a href={link} target="_blank">
        <div className="layer">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i className={classes} aria-hidden="true"></i>
        </div>
        <div className="link-text">{text}</div>
      </a>
    </div>
  );
};

export default LinkBtn;
