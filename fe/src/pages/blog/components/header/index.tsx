import { useState } from "react";

const Header: React.FC = () => {
  const [search, setSearch] = useState("");
  return (
    <header className="blog-header">
      <div className="blog-header-content">
        <h2>Lruler</h2>
        <div className="blog-search">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
