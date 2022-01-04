import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Blog: React.FC = () => {
  const goBlog = () => {

  }
  return (
    <div className="blog-wrapper">
      <Link to='/blog'>
        <button>点我去博客</button>
      </Link>
    </div>
  );
};

export default Blog;
