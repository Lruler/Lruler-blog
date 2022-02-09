// 官方库导入
import React, { useEffect, useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import MarkdownIt from "markdown-it";
// 组件导入
import Message from "../../../components/message";
import Header from "../components/header";
import Card from "../components/card";
import { SidebarL, SidebarR } from "../components/sidebar";
import BlogItem from "../components/item";
// http导入
import { getList } from "../../../services/api/blog";
import { useFetch } from "../../../services/fetch";
// less导入
import "./index.less";

export type blog = {
  title: string;
  content: string;
  tag: string;
  category: string;
  [key: string]: any;
};

type blogList = Array<blog>;

const mdRender = new MarkdownIt();

export let BlogCtx: React.Context<blogList>;

export const List: React.FC = () => {
  const nav = useNavigate();
  const lists = useContext(BlogCtx);

  const getBlog = (id: number) => {
    nav(`${id}`);
  };
  return (
    <ul>
      {lists.map((list, i) => {
        return (
          <Card key={i} onClick={() => getBlog(list.id)}>
            <BlogItem key={list.id} id={i}>
              {mdRender.render(list.content)}
            </BlogItem>
          </Card>
        );
      })}
      <Link to="/blog/edit">去编辑界面</Link>
    </ul>
  );
};

const BlogLayout: React.FC = ({ children }) => {
  return (
    <div className="blog-layout">
      <Header />
      <div className="blog-content">
        <SidebarR />
        <div className="blog-list">{children}</div>
        <SidebarL />
      </div>
    </div>
  );
};

const BlogList: React.FC = () => {
  const [blogList, setBlogList] = useState<blogList>([]);
  BlogCtx = React.createContext(blogList);

  useEffect(() => {
    (async () => {
      const res = await useFetch(getList, 3);

      if (res instanceof Error) Message.error("服务端错误");
      else setBlogList(res.data.rows);
    })();
  }, []);

  return (
    <BlogCtx.Provider value={blogList}>
      <BlogLayout>
        <Outlet />
      </BlogLayout>
    </BlogCtx.Provider>
  );
};

export default BlogList;
