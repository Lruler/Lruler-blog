import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Blog from "./pages/blog/list/index";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='blog' element={<Blog />} />
          <Route path='/' element={<Navigate to='home' />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
