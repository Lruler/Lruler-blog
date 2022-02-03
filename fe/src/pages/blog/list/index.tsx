// 官方库导入
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import MarkdownIt from "markdown-it";
// 组件导入
import Message from "../../../components/message";
import Header from "../components/header";
import { SidebarL, SidebarR } from "../components/sidebar";
import BlogItem from "../components/item";
// http导入
import { getList } from "../../../services/api/blog";
import { useFetch } from "../../../services/fetch";
// less导入
import "./index.less";
import ReactMarkdown from "react-markdown";

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

const List: React.FC = () => {
  const lists = useContext(BlogCtx);
  return (
    <div className="blog-list">
      <ul>
        {lists.map((list, i) => {
          return (
            <BlogItem key={list.id} id={i}>
              {mdRender.render(list.content)}
            </BlogItem>
          );
        })}
        <Link to="/blog/edit">去编辑界面</Link>
      </ul>
    </div>
  );
};

const BlogLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className="blog-layout">
        <SidebarR />
        <div className="blog-content">{children}</div>
        <SidebarL />
      </div>
    </>
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
        <List />
      </BlogLayout>
    </BlogCtx.Provider>
  );
};

export default BlogList;
