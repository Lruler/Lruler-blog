import React from "react";
import ReactDOM from "react-dom";
import close from "../../assets/images/close.png";
import checked from "../../assets/images/checked.png";
import "./index.css";

interface messageProps {
  msg: string;
  status: 0 | 1; //代表 失败/成功 (pengding/ warning暂时不需要)
}

const Msg: React.FC<messageProps> = ({ msg, status }) => {
  let icon: string;

  switch (status) {
    case 0:
      icon = close;
      break;
    case 1:
      icon = checked;
      break;
  }

  const result = (
    <div className="msg-wrapper">
      <img className="msg-icon" src={icon}></img>
      <div className="msg-detail">{msg}</div>
    </div>
  );

  return ReactDOM.createPortal(result, document.body);
};

interface messageComp extends React.FC<messageProps> {
  success: (msg: string) => void;
  error: (msg: string) => void;
}

const Message = Msg as messageComp;

Message.success = (msg: string) => {
  const success = <Msg msg={msg} status={1} />;
  const div = document.createElement("div");
  document.body.append(div);
  ReactDOM.render(success, div);
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  }, 1000);
};

Message.error = (msg: string) => {
  const success = <Msg msg={msg} status={0} />;
  const div = document.createElement("div");
  document.body.append(div);
  ReactDOM.render(success, div);
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  }, 1000);
};

export default Message;
