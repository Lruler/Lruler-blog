import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Blog from "./pages/blog/list";
import Edit from "./pages/blog/edit";
import Detail from "./pages/blog/detail";
import { List } from "./pages/blog/list";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="blog/list" element={<Blog />}>
            <Route path="" element={<List />} />
            <Route path=":id" element={<Detail />} />
          </Route>
          <Route path="blog/edit" element={<Edit />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
