import { useEffect, useState } from "react";
import useFetch from "../../../../services/fetch";
import Tag from "../tag";
import LinkBtn from "../../../../components/linkBtn";
import "./index.less";

export const SidebarR: React.FC = () => {
  return (
    <div className="blog-sidebar sidebar-R">
      <div className="sidebar-link">
        <LinkBtn
          link={"https://github.com/Lruler"}
          icon="github"
          text="Github"
        />
        <LinkBtn link={"/resume"} icon="bed" text="简历" />
        <LinkBtn link={"/"} icon="home" text="主页" isBlank={false} />
        <LinkBtn link={"/blog/list/page=0"} icon="book" text="首页" isBlank={false} />
      </div>
    </div>
  );
};

export const SidebarL: React.FC = () => {
  const [tags, setTags] = useState<TagRes[]>();
  useEffect(() => {
    (async () => {
      const res = await useFetch("getTags");
      setTags(res.data);
    })();
  }, []);
  return (
    <div className="blog-sidebar">
      <div className="sidebar-tags">
        {tags?.map((tag) => (
          <Tag key={tag.id} tag={tag.tag} count={tag.count} />
        ))}
      </div>
    </div>
  );
};
