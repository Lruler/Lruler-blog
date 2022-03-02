import React from "react";
import Login from "../login";
import Intro from "../intro";
import Fullpage from "../../components/fullpage";

const Home: React.FC = () => {
  return (
    <Fullpage routes={["home", "intro"]} tips={["主页", "我的网站"]}>
      <Login />
      <Intro />
    </Fullpage>
  );
};

export default Home;
