import React, { useContext } from "react";
import { useNavigate } from "react-router";
import classNames from "classnames";
import "./index.less";
import { BlogCtx } from "../../list";

interface TagProps {
  tag: string;
  size?: "small" | "normal" | "big";
  count?: number;
}

const Tag: React.FC<TagProps> = ({ tag, count, size = "normal" }) => {
  const { setPage } = useContext(BlogCtx);
  const classes = classNames("tag-wrapper", size);
  const navigate = useNavigate();
  const getBlogs = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setPage(0);
    navigate(`/blog/list/tag/${tag}/0`);
  };
  return (
    <div className={classes} onClick={getBlogs}>
      {tag} {count}
    </div>
  );
};

export default Tag;
