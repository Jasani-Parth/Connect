import React from "react";
import Posts from "../components/home/Posts";
import { useSelector } from "react-redux";
import LoadIcon from "../images/loading.gif";

import RightSideBar from "../components/home/RightSideBar";
import LeftSideBar from "../components/home/LeftSideBar";

const Home = () => {
  const { auth, homePosts } = useSelector((state) => state);
  return (
    <div className="home">
      <LeftSideBar />

      <div className="home_central_panel" id="posts">
        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 || homePosts.posts.length === 0 ? (
          <div className="no_post_msg">
            No Posts Yet !! <br /> What about <br />
            following some of Your Friends ...
          </div>
        ) : (
          <Posts />
        )}
      </div>

      <RightSideBar />
    </div>
  );
};

export default Home;
