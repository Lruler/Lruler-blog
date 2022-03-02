import React from "react";
import resume from "../../../assets/pdf/resume.pdf";
import "./index.less";

const Resume: React.FC = () => {
  return (
    <div className="resume-page">
      <embed src={resume} type="application/pdf" width="100%" height="100%" />
    </div>
  );
};

export default Resume;
