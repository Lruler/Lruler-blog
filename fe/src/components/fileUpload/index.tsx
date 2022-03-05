import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Button from "../button";
import "./index.less";

type ChangeEvent = React.ChangeEventHandler<HTMLInputElement>;

interface UploadProps {
  onChange: ChangeEvent;
}

interface CompoundedFileUpload<T> extends React.FC<T> {
  success?: (url: string) => void;
  useUpload: (onChange: ChangeEvent) => void;
}

const FileUpload: CompoundedFileUpload<UploadProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploadSuc, setUploadSuc] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  FileUpload.success = (url) => {
    setUploadSuc(true);
    setImgUrl(url);
    console.log(url)
  };

  const clickUpload = () => {
    inputRef.current?.click();
  };

  const close = () => {
    const div = document.getElementById("fileUpload");
    ReactDOM.unmountComponentAtNode(div as Element);
    (div as Element).remove();
  };
  
  return (
    <div className="upload-wrapper">
      {uploadSuc ? (
        <>
          <p>该图片链接是:</p>
          <p>{imgUrl}</p>
          <p>已复制到剪切版</p>
        </>
      ) : (
        <>
          <p>点击或拖拽上传</p>
          <input
            className="fileupload"
            ref={inputRef}
            onChange={onChange}
            type="file"
          />
          <Button onClick={clickUpload}>上传文件</Button>
        </>
      )}
      <div className="close" onClick={close}>X</div>
    </div>
  );
};

FileUpload.useUpload = (onChange) => {
  const div = document.createElement("div");
  div.id = "fileUpload";
  document.body.append(div);
  ReactDOM.render(<FileUpload onChange={onChange} />, div);
};

export default FileUpload;
