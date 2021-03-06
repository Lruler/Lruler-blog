import { useEffect, useState } from "react";
import useFetch from "../../../../services/fetch";
import { permission } from "../../../../router";
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
        <LinkBtn link={"/home"} icon="home" text="主页" isBlank={false} />
        <LinkBtn
          link={"/blog/list/page=0"}
          icon="book"
          text="首页"
          isBlank={false}
        />
        {permission ? (
          <LinkBtn
            link={"/blog/edit"}
            icon="pencil-square-o"
            text="编辑"
            isBlank={false}
          />
        ) : null}
      </div>
    </div>
  );
};

export const SidebarL: React.FC = () => {
  const [tags, setTags] = useState<TagRes[]>();
  useEffect(() => {
    let isUnmount = false; //这里插入isUnmount
    (async () => {
      const res = await useFetch("getTags");
      if (res.code === 0 && !isUnmount) setTags(res.data);
    })();
    return () => {
      isUnmount = true;
    };
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
