import React from "react";
import Login from "../login";
import Blog from "../blog";
import Resume from "../resume";
import Fullpage from "../../components/fullpage";
import "./index.less";

const Home: React.FC = () => {
  return (
    // <div className="shell">
    //   <div className="image"></div>
    //   <div className="heading">
    //     <h1>When you are confused</h1>
    //   </div>
    //   <div className="text">
    //     <h1>Set goals in your mind</h1>
    //   </div>

    //   <div className="image"></div>
    //   <div className="heading">
    //     <h1>When you're down</h1>
    //   </div>
    //   <div className="text">
    //     <h1>Try to wake up the beast in your heart</h1>
    //   </div>

    //   <div className="image"></div>
    //   <div className="heading">
    //     <h1>When prople leave you</h1>
    //   </div>
    //   <div className="text">
    //     <h1>It's time to start your season</h1>
    //   </div>

    //   <div className="image"></div>
    //   <div className="heading">
    //     <h1>Come on,stranger.</h1>
    //   </div>
    // </div>
    <Fullpage
      routes={["home", "blog", "resume", "1", "2", "3"]}
      tips={["主页", "个人博客", "我的简历"]}
    >
      <Login />
      <Blog />
      <Resume />
    </Fullpage>
  );
};

export default Home;
