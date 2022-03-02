import React, { useContext } from "react";
import useFetch from "../../../../services/fetch";
import { useNavigate } from "react-router";
import { BlogCtx } from "../../list";
import classNames from "classnames";
import "./index.less";

interface TagProps {
  tag: string;
  size?: "small" | "normal" | "big";
  count?: number;
}

const Tag: React.FC<TagProps> = ({ tag, count, size = "normal" }) => {
  const classes = classNames("tag-wrapper", size);
  const navigate = useNavigate()
  const { setBlogList } = useContext(BlogCtx);
  const getBlogs = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const res = await useFetch("getBlogByTag", { tag });
    navigate('/blog/list')
    setBlogList(res.data)
  };
  return (
    <div className={classes} onClick={getBlogs}>
      {tag} {count}
    </div>
  );
};

export default Tag;
