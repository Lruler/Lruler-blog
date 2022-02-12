import React, { useRef } from "react";
import Modal from "../modal";
import Button from "../button";
import "./index.less";

interface UploadProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FileUpload: React.FC<UploadProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const clickUpload = () => {
    inputRef.current?.click();
  };

  return (
    <Modal>
      <div className="upload-wrapper">
        <p>点击或拖拽上传</p>
        <input
          className="fileupload"
          ref={inputRef}
          onChange={onChange}
          type="file"
        />
        <Button onClick={clickUpload}>上传文件</Button>
      </div>
    </Modal>
  );
};

export default FileUpload;
