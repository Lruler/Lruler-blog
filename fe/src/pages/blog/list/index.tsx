// 官方库导入
import React, { useEffect, useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import MarkdownIt from "markdown-it";
// 组件导入
import Message from "../../../components/message";
import Header from "../components/header";
import Card from "../components/card";
import Tag from "../components/tag";
import { SidebarL, SidebarR } from "../components/sidebar";
import BlogItem from "../components/item";
// http导入
import useFetch from "../../../services/fetch";
// less导入
import "./index.less";

type BlogCtx = {
  blogList: Blog[];
  nextPage: () => void;
};

export let BlogCtx: React.Context<BlogCtx>;

export const List: React.FC = () => {
  const nav = useNavigate();
  const mdRender = new MarkdownIt();
  const ctx = useContext(BlogCtx);
  const { blogList, nextPage } = ctx;
  const getBlog = (id: number) => {
    nav(`${id}`);
  };
  return (
    <>
      <ul>
        {blogList.map((list, i) => {
          return (
            <Card key={i} onClick={() => getBlog(list.id)}>
              <BlogItem tags={(list.tags as TagRes[])} title={list.title}>
                {list.intro}
              </BlogItem>
            </Card>
          );
        })}
        <Link to="/blog/edit">去编辑界面</Link>
        <button onClick={nextPage}>下一页</button>
        <h1></h1>
      </ul>
    </>
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
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage(page + 1);
  };

  BlogCtx = React.createContext({ blogList, nextPage });

  useEffect(() => {
    (async () => {
      const res = await useFetch("getList", { page });
      setBlogList(res.data.rows);
    })();
  }, [page]);

  return (
    <BlogCtx.Provider value={{ blogList, nextPage }}>
      <BlogLayout>
        <Outlet />
      </BlogLayout>
    </BlogCtx.Provider>
  );
};

export default BlogList;
