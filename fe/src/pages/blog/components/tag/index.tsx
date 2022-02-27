import React from "react";
import classNames from "classnames";
import "./index.less";

interface TagProps {
  tag: string;
  size?: 'small' | 'normal' | 'big';
  count?: number;
}

const Tag: React.FC<TagProps> = ({ tag, count, size='normal' }) => {
  const classes = classNames("tag-wrapper", size);
  return (
    <div className={classes}>
      {tag} {count}
    </div>
  );
};

export default Tag;
