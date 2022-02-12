import { useEffect, useState } from "react";
import Editor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
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
  const [content, setContent] = useState("");
  const [blogMsg, setBlogMsg] = useState<BlogPro>({
    title: "",
    tag: "",
    category: "",
  });
  const [imgUpload, setImgUpload] = useState({ isUplpad: false, imgUrl: "" });

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
    }
  };

  useEffect(() => {
    const img = document.getElementsByClassName("rmel-icon-image")[0];
    img.addEventListener("click", () => {
      setImgUpload((pre) => ({ ...pre, isUplpad: true }));
    });
  }, []);

  return (
    <>
      {imgUpload.isUplpad ? <FileUpload onChange={uploadImg} /> : null}
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
    </>
  );
}
