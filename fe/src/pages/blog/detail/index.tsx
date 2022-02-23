import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MarkdownIt from "markdown-it";
// import { useFetch } from "../../../services/fetch";
// import { getBlog } from "../../../services/api/blog";

const Detail: React.FC = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");

  const mRender = new MarkdownIt();

  // useEffect(() => {
  //   (async () => {
  //     const res = await useFetch(getBlog, id);
  //     setContent(mRender.render(res.data.content));
  //   })();
  // }, []);
  return (
    <div id="blog-detail" dangerouslySetInnerHTML={{ __html: content }}></div>
  );
};

export default Detail;
