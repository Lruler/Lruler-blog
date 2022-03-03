// 官方库导入
import React, { useEffect, useState, useContext, SetStateAction } from "react";
import { useLocation, useParams, useOutlet } from "react-router-dom";
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
import useDelayNav from "../../../hooks/useDelayNac";

type BlogCtx = {
  blogList: Blog[];
  page: number;
  setBlogList: React.Dispatch<SetStateAction<Blog[]>>;
  setPage: React.Dispatch<SetStateAction<number>>;
};

export let BlogCtx: React.Context<BlogCtx>;

export const List: React.FC = () => {
  const nav = useNavigate();
  const { setPage, page, blogList } = useContext(BlogCtx);
  const getBlog = (id: number) => {
    useDelayNav(nav, `/blog/list/item/${id}`);
  };
  const list =
    blogList.length !== 0 ? (
      blogList.map((list, i) => {
        return (
          <Card key={i} onClick={() => getBlog(list.id)}>
            <BlogItem
              time={String(list.createdAt)}
              tags={list.tags as TagRes[]}
              title={list.title}
            >
              {list.intro}
            </BlogItem>
          </Card>
        );
      })
    ) : (
      <div className="h1">作者江郎才尽，没有后续了QAQ</div>
    );
  return (
    <>
      <div className="h1">ArticlesList</div>
      <ul>{list}</ul>
      <div className="page-controller">
        <Button
          disabled={!page}
          onClick={() => {
            setPage((p) => p - 1);
            useDelayNav(nav, `/blog/list/page=${page - 1}`);
          }}
        >
          上一页
        </Button>
        <Button
          disabled={blogList.length === 0}
          onClick={() => {
            setPage((p) => p + 1);
            useDelayNav(nav, `/blog/list/page=${page + 1}`);
          }}
        >
          下一页
        </Button>
      </div>
    </>
  );
};

export const ListByTag: React.FC = () => {
  const nav = useNavigate();
  const params = useParams();
  const { setPage, page, blogList } = useContext(BlogCtx);
  const getBlog = (id: number) => {
    useDelayNav(nav, `/blog/list/item/${id}`);
  };
  const list =
    blogList.length !== 0 ? (
      blogList.map((list, i) => {
        return (
          <Card key={i} onClick={() => getBlog(list.id)}>
            <BlogItem
              time={String(list.createdAt)}
              tags={list.tags as TagRes[]}
              title={list.title}
            >
              {list.intro}
            </BlogItem>
          </Card>
        );
      })
    ) : (
      <div className="h1">作者江郎才尽，没有后续了QAQ</div>
    );
  return (
    <>
      <div className="h1">ArticlesList</div>
      <ul>{list}</ul>
      <div className="page-controller">
        <Button
          disabled={!page}
          onClick={() => {
            setPage((p) => p - 1);
            useDelayNav(nav, `/blog/list/tag/${params.tag}/page=${page - 1}`);
          }}
        >
          上一页
        </Button>
        <Button
          disabled={blogList.length === 0}
          onClick={() => {
            setPage((p) => p + 1);
            useDelayNav(nav, `/blog/list/tag/${params.tag}/page=${page + 1}`);
          }}
        >
          下一页
        </Button>
      </div>
    </>
  );
};

export const ListBySearch: React.FC = () => {
  const nav = useNavigate();
  const params = useParams();
  const { setPage, page, blogList } = useContext(BlogCtx);
  const getBlog = (id: number) => {
    useDelayNav(nav, `/blog/list/item/${id}`);
  };
  const list =
    blogList.length !== 0 ? (
      blogList.map((list, i) => {
        return (
          <Card key={i} onClick={() => getBlog(list.id)}>
            <BlogItem
              time={String(list.createdAt)}
              tags={list.tags as TagRes[]}
              title={list.title}
            >
              {list.intro}
            </BlogItem>
          </Card>
        );
      })
    ) : (
      <div className="h1">作者江郎才尽，没有后续了QAQ</div>
    );
  return (
    <>
      <div className="h1">ArticlesList</div>
      <ul>{list}</ul>
      <div className="page-controller">
        <Button
          disabled={!page}
          onClick={() => {
            setPage((p) => p - 1);
            useDelayNav(
              nav,
              `/blog/list/search/${params.key}/page=${page - 1}`
            );
          }}
        >
          上一页
        </Button>
        <Button
          disabled={blogList.length === 0}
          onClick={() => {
            setPage((p) => p + 1);
            useDelayNav(
              nav,
              `/blog/list/search/${params.key}/page=${page + 1}`
            );
          }}
        >
          下一页
        </Button>
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
  const location = useLocation();
  const { pathname } = location;
  const outlet = useOutlet();
  const params = useParams();
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);

  BlogCtx = React.createContext({
    blogList,
    page,
    setBlogList,
    setPage,
  });

  useEffect(() => {
    (async () => {
      if (location.pathname.includes("tag")) {
        const res = await useFetch("getBlogByTag", {
          tag: params.tag as string,
          page: page,
        });
        setBlogList(res.data);
      } else if (location.pathname.includes("search")) {
        const res = await useFetch("searchBlog", {
          key: params.key as string,
          page: page,
        });
        setBlogList(res.data.rows);
      } else {
        const res = await useFetch("getList", { page });
        setBlogList(res.data.rows);
      }
    })();
  }, [pathname]);

  return (
    <BlogCtx.Provider value={{ blogList, page, setBlogList, setPage }}>
      <BlogLayout>{outlet}</BlogLayout>
    </BlogCtx.Provider>
  );
};

export default BlogList;
