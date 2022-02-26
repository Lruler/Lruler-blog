import Tag from "../tag";

export const SidebarR: React.FC = () => {
  return <div className="blog-sidebar">侧边栏 展示分类</div>;
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
