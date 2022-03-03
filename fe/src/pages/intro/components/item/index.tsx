import React from "react";
import Tag from "../tag";
import Text from "../text";
import "./index.less";

interface ItemProp {
  title: string;
  tags: TagRes[];
  time: string;
}

const BlogItem: React.FC<ItemProp> = ({ children, title, tags, time }) => {
  return (
    <li className="blog-item">
      <div className="blog-item-title">
        <Text text={title} />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: children as string }}
        className="blog-item-content"
      ></div>
      <div className="blog-item-intro">
        <div className="tags">
          {tags.map((t) => (
            <Tag key={t.id} tag={t.tag} size="small" />
          ))}
        </div>
        <div className="time">{`${time.slice(0, 10)} ${time.slice(11, 16)}`}</div>
      </div>
    </li>
  );
};

export default BlogItem;
