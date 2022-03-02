import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MarkdownIt from "markdown-it";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useFetch from "../../../services/fetch";
import './index.less'

const Detail: React.FC = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");

  useScrollToTop()

  const mRender = new MarkdownIt();

  useEffect(() => {
    (async () => {
      const res = await useFetch('getBlog', { id: (id as string) });
      setContent(mRender.render(res.data.content));
    })();
  }, []);
  return (
    <>
      <div id="blog-detail" dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );
};

export default Detail;
