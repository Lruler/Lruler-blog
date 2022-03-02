import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/home";
import Blog from "./pages/intro/list";
import Edit from "./pages/intro/edit";
import Detail from "./pages/intro/detail";
import Resume from "./pages/intro/resume";
import { List } from "./pages/intro/list";

const App: React.FC = () => {
  const [skip, setSkip] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setSkip(true);
    setTimeout(() => {
      setSkip(false);
    }, 1000);
  }, [location.pathname]);
  return (
    <div className="router-change-animation" style={{ filter: skip ? `blur(5px)` : "none" }}>
      <Routes>
        <Route path="blog/list" element={<Blog />}>
          <Route path="" element={<List />} />
          <Route path=":id" element={<Detail />} />
        </Route>
        <Route path="blog/edit" element={<Edit />} />
        <Route path="*" element={<Home />} />
        <Route path="resume" element={<Resume />} />
      </Routes>
    </div>
  );
};

export default App;
