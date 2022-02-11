import React, { useEffect } from "react";
import "./index.less";

interface ItemProp {
  id: number;
}

const BlogItem: React.FC<ItemProp> = ({ children, id }) => {
  return (
    <li
      dangerouslySetInnerHTML={{ __html: children as string }}
      className="blog-item"
    />
  );
};

export default BlogItem;
