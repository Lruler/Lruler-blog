import React, { MouseEventHandler } from "react";
import "./index.less";

interface CardProps {
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ onClick, children }) => {
  return (
    <div onClick={onClick} className="card-wrapper">
      {children}
    </div>
  );
};

export default Card;
