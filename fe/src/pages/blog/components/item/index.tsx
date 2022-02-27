import React, { useEffect } from "react";
import "./index.less";

interface ItemProp {
  title: string;
}

const BlogItem: React.FC<ItemProp> = ({ children, title }) => {
  return (
    <li className="blog-item">
      <div className="blog-item-title">{title}</div>
      <div
        dangerouslySetInnerHTML={{ __html: children as string }}
        className="blog-item-content"
      ></div>
    </li>
  );
};

export default BlogItem;
