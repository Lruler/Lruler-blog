// 官方库导入
import React, { useEffect, useState, useContext, SetStateAction } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
// 组件导入
import Header from "../components/header";
import Card from "../components/card";
import { SidebarL, SidebarR } from "../components/sidebar";
import BlogItem from "../components/item";
import Button from "../../../components/button";
import useTime from "../../../hooks/useTime";
// http导入
import useFetch from "../../../services/fetch";
// less导入
import "./index.less";

type BlogCtx = {
  blogList: Blog[];
  page: number;
  search: (key: string) => Promise<void>;
  setBlogList: React.Dispatch<SetStateAction<Blog[]>>;
  setPage: React.Dispatch<SetStateAction<number>>;
};

export let BlogCtx: React.Context<BlogCtx>;

export const List: React.FC = () => {
  const nav = useNavigate();
  const { setPage, page, blogList } = useContext(BlogCtx);
  const getBlog = (id: number) => {
    nav(`${id}`);
  };
  return (
    <>
      <div className="h1">ArticlesList</div>
      <ul>
        {blogList.map((list, i) => {
          return (
            <Card key={i} onClick={() => getBlog(list.id)}>
              <BlogItem tags={list.tags as TagRes[]} title={list.title}>
                {list.intro}
              </BlogItem>
            </Card>
          );
        })}
      </ul>
      <div className="page-controller">
        <Button
          disabled={!page ? true : false}
          onClick={() => setPage((p) => p - 1)}
        >
          上一页
        </Button>
        <Button onClick={() => setPage((p) => p + 1)}>下一页</Button>
      </div>
    </>
  );
};

const BlogLayout: React.FC = ({ children }) => {
  const time = useTime();
  return (
    <div className="blog-layout">
      <Header />
      <div className="blog-content">
        <SidebarR />
        <div className="blog-list">{children}</div>
        <SidebarL />
      </div>
      <footer>
        {time}
        <i className="fa fa-heart" aria-hidden="true" />
      </footer>
    </div>
  );
};

const BlogList: React.FC = () => {
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);

  const search = async (key: string) => {
    const res = await useFetch("searchBlog", { key, page });
    setBlogList(res.data.rows);
  };

  BlogCtx = React.createContext({
    blogList,
    page,
    search,
    setBlogList,
    setPage,
  });

  useEffect(() => {
    (async () => {
      const res = await useFetch("getList", { page });
      setBlogList(res.data.rows);
    })();
  }, [page]);

  return (
    <BlogCtx.Provider value={{ blogList, page, search, setBlogList, setPage }}>
      <BlogLayout>
        <Outlet />
      </BlogLayout>
    </BlogCtx.Provider>
  );
};

export default BlogList;
