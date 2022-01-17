import React from "react";
import "./index.css";

const Header: React.FC = () => {
  return (
    <header className="blog-header">
      <p>Lruler</p>
    </header>
  );
};

const SidebarR: React.FC = () => {
  return <div className="blog-sidebar">侧边栏</div>;
};

const SidebarL: React.FC = () => {
  return <div className="blog-sidebar">侧边栏</div>;
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
