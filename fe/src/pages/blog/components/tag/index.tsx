import React from "react";
import "./index.less";

interface TagProps {
  tag: string;
  count?: number;
}

const Tag: React.FC<TagProps> = ({ tag, count }) => {
    return <div className="tag-wrapper">{tag} {count}</div>;
};

export default Tag;
