import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.less";

const Header: React.FC = () => {
  const [search, setSearch] = useState("");
  return (
    <header className="blog-header">
      <div className="blog-header-content">
        <p>Lruler</p>
        <div className="blog-search">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

const SidebarR: React.FC = () => {
  return <div className="blog-sidebar">侧边栏 展示分类</div>;
};

const SidebarL: React.FC = () => {
  return <div className="blog-sidebar">侧边栏 展示标签</div>;
};

const List: React.FC = () => {
  return (
    <div className="blog-list">
      <ul>
        <li>博客文章</li>
        <li>博客文章</li>
        <li>博客文章</li>
        <li>博客文章</li>
        <li>博客文章</li>
        <li>博客文章</li>
        <Link to='/blog/edit'>去编辑界面</Link>
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
  return (
    <BlogLayout>
      <List />
    </BlogLayout>
  );
};

export default BlogList;
