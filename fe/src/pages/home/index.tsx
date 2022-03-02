import React from "react";
import Login from "../login";
import Blog from "../blog";
import Fullpage from "../../components/fullpage";

const Home: React.FC = () => {
  return (
    <Fullpage routes={["home", "intro"]} tips={["主页", "我的网站"]}>
      <Login />
      <Blog />
    </Fullpage>
  );
};

export default Home;
