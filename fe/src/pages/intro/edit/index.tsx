import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useNavigate } from "react-router";
import useScrollToTop from "../../../hooks/useScrollToTop";
import Message from "../../../components/message";
import FileUpload from "../../../components/fileUpload";
import useFetch from "../../../services/fetch";
import "./index.less";

interface editPro {
  html: string;
  text: string;
}

interface BlogPro {
  title: string;
  tags: string;
}

const mdRender = new MarkdownIt();

export default function Edit() {
  const nav = useNavigate();
  useScrollToTop();
  const [content, setContent] = useState("");
  const [blogMsg, setBlogMsg] = useState<BlogPro>({
    title: "",
    tags: "",
  });
  const [intro, setIntro] = useState("");

  const handleContent = ({ html, text }: editPro) => {
    setContent(text);
  };

  const post = async () => {
    if (blogMsg.tags && blogMsg.title && content) {
      const blog = { ...blogMsg, content, intro };
      const data = await useFetch("postBlog", blog, "POST");
      Message.success(data.msg);
      nav(`/blog/list/page=0`);
    } else {
      Message.error("请填写完整!");
    }
  };

  const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const imgFile = e.currentTarget.files[0];
      const imgData = new FormData();
      imgData.append("file", imgFile);
      const res = await useFetch("fileUpload", imgData, "POST");
      if (FileUpload.success) FileUpload.success(res.data.url);
    }
  };

  useEffect(() => {
    const img = document.getElementsByClassName("rmel-icon-image")[0];
    img.addEventListener("click", () => {
      FileUpload.useUpload(uploadImg);
    });
  }, []);

  return (
    <>
      <div className="edit-wrapper">
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
              setBlogMsg((pre) => ({ ...pre, tags: e.target.value }))
            }
          />
        </form>
        <textarea
          placeholder="输入文章简介"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
        <Editor
          value={content}
          onChange={handleContent}
          style={{ height: "100%" }}
          renderHTML={(text) => mdRender.render(text)}
        />
      </div>
    </>
  );
}
