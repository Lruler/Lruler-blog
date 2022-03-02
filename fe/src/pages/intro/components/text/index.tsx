import React from "react";
import "./index.less";

interface TextProps {
  text: string;
}

const Text: React.FC<TextProps> = ({ text }) => {
  return (
    <div className="boom" data-text={text}>
      <span>{text}</span>
    </div>
  );
};

export default Text;
