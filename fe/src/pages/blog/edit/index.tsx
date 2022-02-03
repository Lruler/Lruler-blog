import { useState } from "react";
import Editor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import Message from "../../../components/message";
import { useFetch } from "../../../services/fetch";
import { postBlog } from "../../../services/api/blog";
import "./index.less";

interface editPro {
  html: string;
  text: string;
}

interface BlogPro {
  title: string;
  tag: string;
  category: string;
}

const mdRender = new MarkdownIt();

export default function Edit() {
  const [content, setContent] = useState("");
  const [blogMsg, setBlogMsg] = useState<BlogPro>({
    title: "",
    tag: "",
    category: "",
  });

  const handleContent = ({ html, text }: editPro) => {
    setContent(text);
  };

  const post = async () => {
    if (blogMsg.category && blogMsg.tag && blogMsg.title) {
      const blog = { ...blogMsg, content };
      const data = await useFetch(postBlog, blog);
      Message.success(data.msg);
    } else {
      Message.error("请填写完整!");
    }
  };

  return (
    <div className="edid-wrapper">
      <button onClick={post}>发表文章</button>
      <form>
        title:
        <input
          type="text"
          onChange={(e) =>
            setBlogMsg((pre) => ({ ...pre, title: e.target.value }))
          }
        />
        tag:
        <input
          type="text"
          onChange={(e) =>
            setBlogMsg((pre) => ({ ...pre, tag: e.target.value }))
          }
        />
        category:
        <input
          type="text"
          onChange={(e) =>
            setBlogMsg((pre) => ({ ...pre, category: e.target.value }))
          }
        />
      </form>
      <Editor
        value={content}
        onChange={handleContent}
        style={{
          height: `${window.screen.height}px`,
        }}
        renderHTML={(text) => mdRender.render(text)}
      />
    </div>
  );
}
