import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Blog from "./pages/blog/list/index";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="blog/list" element={<Blog />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
