import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useFetch from "../../../services/fetch";
// 引入默认样式
import "highlight.js/scss/default.scss";
// 引入个性化的vs2015样式
import "highlight.js/styles/vs2015.css";
import "./index.less";

const Detail: React.FC = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");

  useScrollToTop();

  const md: MarkdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      // 此处判断是否有添加代码语言
      if (lang && hljs.getLanguage(lang)) {
        try {
          // 得到经过highlight.js之后的html代码
          const preCode = hljs.highlight(lang, str, true).value;
          // 以换行进行分割
          const lines = preCode.split(/\n/).slice(0, -1);
          // 添加自定义行号
          let html = lines
            .map((item, index) => {
              return (
                '<li><span class="line-num" data-line="' +
                (index + 1) +
                '"></span>' +
                item +
                "</li>"
              );
            })
            .join("");
          html = "<ol>" + html + "</ol>";
          // 添加代码语言
          if (lines.length) {
            html += '<b class="name">' + lang + "</b>";
          }
          return '<pre class="hljs"><code>' + html + "</code></pre>";
        } catch (__) {}
      }
      // 未添加代码语言，此处与上面同理
      const preCode = md.utils.escapeHtml(str);
      const lines = preCode.split(/\n/).slice(0, -1);
      let html = lines
        .map((item, index) => {
          return (
            '<li><span class="line-num" data-line="' +
            (index + 1) +
            '"></span>' +
            item +
            "</li>"
          );
        })
        .join("");
      html = "<ol>" + html + "</ol>";
      return '<pre class="hljs"><code>' + html + "</code></pre>";
    },
  });

  useEffect(() => {
    (async () => {
      const res = await useFetch("getBlog", { id: id as string });
      console.log(res);
      setContent(md.render(res.data.content));
    })();
  }, []);
  return (
    <>
      <div id="blog-detail" dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );
};

export default Detail;
