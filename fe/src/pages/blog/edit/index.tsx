import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import useScrollToTop from "../../../hooks/useScrollToTop";
import Message from "../../../components/message";
import FileUpload from "../../../components/fileUpload";
import { useFetch } from "../../../services/fetch";
import { postBlog, fileUpload } from "../../../services/api/blog";
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
  useScrollToTop();
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
    if (blogMsg.category && blogMsg.tag && blogMsg.title && content) {
      const blog = { ...blogMsg, content };
      const data = await useFetch(postBlog, blog);
      Message.success(data.msg);
    } else {
      Message.error("请填写完整!");
    }
  };

  const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const imgFile = e.currentTarget.files[0];
      const imgData = new FormData();
      imgData.append("file", imgFile);
      const res = await useFetch(fileUpload, imgData);
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
          style={{ height: "100%" }}
          renderHTML={(text) => mdRender.render(text)}
        />
      </div>
    </>
  );
}
