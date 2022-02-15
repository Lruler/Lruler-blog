import React, { useEffect, useRef, useState } from "react";
import Button from "../button";
import useClipboard from "../../hooks/useClipboard";
import "./index.less";

interface UploadProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface CompoundedFileUpload<T> extends React.FC<T> {
  success?: (url: string) => void;
}

const FileUpload: CompoundedFileUpload<UploadProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploadSuc, setUploadSuc] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  FileUpload.success = (url) => {
    useClipboard(url);
    setUploadSuc(true);
    setImgUrl(url);
  };

  const clickUpload = () => {
    inputRef.current?.click();
  };

  const close = () => {

  }
  
  return (
    <div className="upload-wrapper">
      {uploadSuc ? (
        <>
          <p>该图片链接是</p>
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
      <div className="close">X</div>
    </div>
  );
};

// FileUpload.success = (url) => {
//   useClipboard(url);

// };

export default FileUpload;
