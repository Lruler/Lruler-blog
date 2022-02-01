import { useState } from "react";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import "./index.less";

interface editPro {
  html: string;
  text: string;
}

export default function Edit() {
  const [content, setContent] = useState("");

  const handleChange = ({ html, text }: editPro) => {
    setContent(text);
  };

  return (
    <div className="App">
      <Editor
        value={content}
        onChange={handleChange}
        style={{
          height: `${window.screen.height}px`,
        }}
        renderHTML={(text) => <ReactMarkdown children={text} />}
      />
    </div>
  );
}
