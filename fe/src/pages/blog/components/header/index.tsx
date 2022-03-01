import { useState, useContext, ChangeEvent } from "react";
import { BlogCtx } from "../../list";

const Header: React.FC = () => {
  const [key, setKey] = useState("");
  const { search } = useContext(BlogCtx);
  const toSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) search(key);
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
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
