import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./index.less";

const Modal: React.FC = ({ children }) => {
  const [size, setSize] = useState({
    height: document.body.offsetHeight,
    width: document.body.offsetWidth,
  });
  useEffect(() => {
    const height = document.body.offsetHeight;
    const width = document.body.offsetWidth;
    setSize({ height, width });
  }, [size.width, size.height]);
  const modal = (
    <div
      className="modal-wrapper"
      style={{ height: size.height, width: size.width }}
    >
      {children}
    </div>
  );
  return createPortal(modal, document.getElementById("root") as HTMLElement);
};

export default Modal;
