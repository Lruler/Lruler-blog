import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import useDelayNav from "../../../../hooks/useDelayNac";
import { BlogCtx } from "../../list";

const Header: React.FC = () => {
  const [key, setKey] = useState("");
  const { setPage } = useContext(BlogCtx);
  const nav = useNavigate();
  const toSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setPage(0);
      if (key === "") {
        useDelayNav(nav, `/blog/list/page=0`);
      } else {
        useDelayNav(nav, `/blog/list/search/${key}/0`);
      }
    }
  };
  return (
    <header className="blog-header">
      <div className="blog-header-content">
        <div className="blog-header-icon">Lruler</div>
        <div className="blog-search">
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={toSearch}
            placeholder="搜索你想看的内容鸭:D"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
