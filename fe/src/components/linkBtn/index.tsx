import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./index.less";

interface LinkProps {
  link: string;
  icon: string;
  text: string;
  isBlank?: boolean;
  color?: string;
}

const LinkBtn: React.FC<LinkProps> = ({
  link,
  icon,
  text,
  color = "white",
  isBlank = true,
}) => {
  const classes = classNames("fa", `fa-${icon}`);

  const isOuter = link.includes("http") ? (
    <a href={link} target={isBlank ? "_blank" : "_parent"}>
      <div className="layer">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i className={classes} aria-hidden="true"></i>
      </div>
      <div className="link-text">{text}</div>
    </a>
  ) : (
    <Link to={link} target={isBlank ? "_blank" : "_parent"}>
      <div className="layer">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i className={classes} aria-hidden="true"></i>
      </div>
      <div className="link-text">{text}</div>
    </Link>
  );

  return (
    <div className="link-btn" data-color={color}>
      {isOuter}
    </div>
  );
};

export default LinkBtn;
