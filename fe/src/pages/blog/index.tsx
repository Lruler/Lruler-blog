import React from "react";
import { Link } from "react-router-dom";
import "./index.less";

const Blog: React.FC = () => {
  return (
    <div className="blog-wrapper">
      <Link to='/blog/list'>
        <button>点我去博客</button>
      </Link>
    </div>
  );
};

export default Blog;
