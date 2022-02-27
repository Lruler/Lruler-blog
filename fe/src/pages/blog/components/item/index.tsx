import React from "react";
import Tag from "../tag";
import "./index.less";

interface ItemProp {
  title: string;
  tags: TagRes[];
}

const BlogItem: React.FC<ItemProp> = ({ children, title, tags }) => {
  return (
    <li className="blog-item">
      <div className="blog-item-title">{title}</div>
      <div
        dangerouslySetInnerHTML={{ __html: children as string }}
        className="blog-item-content"
      ></div>
      <div className="blog-item-tags">
        {tags.map( t => <Tag key={t.id} tag={t.tag} size='small' />)}
      </div>
    </li>
  );
};

export default BlogItem;
