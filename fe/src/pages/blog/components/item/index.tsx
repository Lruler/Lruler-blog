import React, { useEffect } from "react";
import './index.less'

interface ItemProp {
  id: number;
}

const BlogItem: React.FC<ItemProp> = ({ children, id }) => {
  useEffect(() => {
    const item = document.getElementsByClassName('blog-item')[id];
    item.innerHTML = children as string
  }, []);

  return (
    <li className="blog-item">
      {children}
    </li>
  );
};

export default BlogItem;
