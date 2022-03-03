import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Blog from "./pages/intro/list";
import Edit from "./pages/intro/edit";
import Detail from "./pages/intro/detail";
import Resume from "./pages/intro/resume";
import { List, ListByTag, ListBySearch } from "./pages/intro/list";
import "./styles/animation.less";

let isSkip: boolean = false;

export let changeSkip: any;

const App: React.FC = () => {
  const location = useLocation()
  const [skip, setSkip] = useState(false);

  changeSkip = setSkip;

  useEffect(() => {
    setSkip(false)
  }, [location.pathname]);

  return (
    <div
      className="router-animation"
      style={{ filter: skip ? `blur(10px)` : "none" }}
    >
      <Routes>
        <Route path="blog/list" element={<Blog />}>
          <Route path=":page" element={<List />} />
          <Route path="tag/:tag/:page" element={<ListByTag />} />
          <Route path="search/:key/:page" element={<ListBySearch />} />
          <Route path="item/:id" element={<Detail />} />
        </Route>
        <Route path="blog/edit" element={<Edit />} />
        <Route path="*" element={<Home />} />
        <Route path="resume" element={<Resume />} />
      </Routes>
    </div>
  );
};

export default App;
