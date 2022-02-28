import Tag from "../tag";
import LinkBtn from "../../../../components/linkBtn";
import './index.less'

export const SidebarR: React.FC = () => {
  return (
    <div className="blog-sidebar sidebar-R">
      <div className="sidebar-link">
        <LinkBtn link={"https://github.com/Lruler"} />
      </div>
    </div>
  );
};

export const SidebarL: React.FC = () => {
  return (
    <div className="blog-sidebar">
      <div className="sidebar-tags">
        <Tag tag="React" count={3} />
        <Tag tag="Js" count={24} />
      </div>
    </div>
  );
};
