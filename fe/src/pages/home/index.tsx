import React from "react";
import Login from "../login";
import Blog from "../blog";
import Resume from "../resume";
import Fullpage from "../../components/fullpage";

const Home: React.FC = () => {
  return (
    <Fullpage
      routes={["home", "blog", "resume"]}
      tips={["主页", "个人博客", "我的简历"]}
    >
      <Login />
      <Blog />
      <Resume />
    </Fullpage>
  );
};

export default Home;
