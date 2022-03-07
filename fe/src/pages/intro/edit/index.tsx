import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useNavigate, useLocation } from "react-router";
import { useDebouncedEffect } from "../../../hooks/useDebounce";
import useDelayNav from "../../../hooks/useDelayNav";
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
  const location = useLocation();
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
      if (data.msg === "success") {
        Message.success(data.msg);
        localStorage.removeItem("content");
        localStorage.removeItem("title");
        localStorage.removeItem("tags");
        localStorage.removeItem("intro");
        useDelayNav(nav, `/blog/list/page=0`);
      } else {
        console.log(222)
        localStorage.removeItem("token");
        useDelayNav(nav, "/home");
      }
    } else {
      Message.error("请填写完整!");
    }
  };

  const update = async () => {
    const t = localStorage.getItem('token')
    console.log(t)
    const res = await useFetch('updateBlog', { id: Number(location.state), content }, "POST")
    if (res.msg === 'success') {
      Message.success('更新成功');
      localStorage.removeItem("content");
      localStorage.removeItem("title");
      localStorage.removeItem("tags");
      localStorage.removeItem("intro");
      useDelayNav(nav, `/blog/list/page=0`);
    }
    // } else {
    //   localStorage.removeItem("token");
    //   useDelayNav(nav, "/home");
    // }
  }
  const back = () => {
    useDelayNav(nav, "/blog/list/page=0");
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

  useEffect(() => {
    if (location.state) {
      (async () => {
        const res = await useFetch("getBlog", { id: location.state as string });
        let t: string = "";
        for (let v of res.data.tags as TagRes[]) {
          t += v.tag + ",";
        }
        t = t.slice(0, -1);
        setBlogMsg({ tags: t, title: res.data.title });
        setIntro(res.data.intro);
        setContent(res.data.content);
      })();
    } else {
      const oldContent = localStorage.getItem("content");
      const ointro = localStorage.getItem("intro");
      const oTags = localStorage.getItem("tags");
      const oTitle = localStorage.getItem("title");
      if (oldContent || oTitle || ointro || oTitle) {
        const r = confirm("检测到你有缓存,是否继续");
        if (r) {
          setContent(oldContent as string);
          setIntro(ointro as string);
          setBlogMsg({ title: oTitle as string, tags: oTags as string });
        } else {
          localStorage.removeItem("content");
          localStorage.removeItem("intro");
          localStorage.removeItem("title");
          localStorage.removeItem("tags");
        }
      }
    }
  }, []);

  useDebouncedEffect(
    () => {
      const draft = localStorage.getItem("content");
      if (content !== "" && content !== draft) {
        localStorage.removeItem("content");
        localStorage.setItem("content", content);
        Message.success("自动保存成功！");
      }
    },
    2000,
    [content]
  );

  return (
    <>
      <div className="edit-wrapper">
        {location.state ? (
          <button onClick={update}>更新文章</button>
        ) : (
          <button onClick={post}>发表文章</button>
        )}

        <button onClick={back}>返回主页</button>
        <form>
          title:
          <input
            type="text"
            value={blogMsg.title}
            onChange={(e) => {
              setBlogMsg((pre) => ({ ...pre, title: e.target.value }));
              localStorage.setItem("title", e.target.value);
            }}
          />
          tag:
          <input
            type="text"
            value={blogMsg.tags}
            onChange={(e) => {
              setBlogMsg((pre) => ({ ...pre, tags: e.target.value }));
              localStorage.setItem("tags", e.target.value);
            }}
          />
        </form>
        <textarea
          placeholder="输入文章简介"
          value={intro}
          onChange={(e) => {
            setIntro(e.target.value);
            localStorage.setItem("intro", e.target.value);
          }}
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
