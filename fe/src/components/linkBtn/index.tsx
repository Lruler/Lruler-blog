import React from "react";
import "./index.less";

interface LinkProps {
  link: string;
}

const LinkBtn: React.FC<LinkProps> = ({ link }) => {
  return (
    <div className="link-btn">
      <a href={link} target='_blank'>
        <div className="layer">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i className="fa fa-github" aria-hidden="true"></i>
        </div>
        <div className="link-text">Github</div>
      </a>
    </div>
  );
};

export default LinkBtn;
