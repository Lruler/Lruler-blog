// 官方库导入
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
// 组件导入
import Message from "../../../components/message";
import Header from "../components/header";
import { SidebarL, SidebarR } from "../components/sidebar";
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

export let BlogCtx: React.Context<blogList>;

const List: React.FC = () => {
  const lists = useContext(BlogCtx);
  return (
    <div className="blog-list">
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <ReactMarkdown children={list.content} />
          </li>
        ))}
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
      const data = await useFetch(getList, 3);
      console.log(data);

      if (data instanceof Error) Message.error("服务端错误");
      else setBlogList(data.rows);
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
