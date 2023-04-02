import React from "react";
import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import { useSelector } from "react-redux";
import LoadIcon from "../images/loading.gif";

import FollowerCard from "../components/home/panel_card/FollowerCard";
import FollowingCard from "../components/home/panel_card/FollowingCard";

import IntroCard from "../components/home/panel_card/IntroCard";
import NavigationCard from "../components/home/panel_card/NavigationCard";

const Home = () => {
  const { auth, homePosts } = useSelector((state) => state);
  return (
    <div className="home">
      <div className="home_left_panel">
        <IntroCard />
        <NavigationCard/>
      </div>
      <div className="home_central_panel" id="posts">
        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 ? (
          <div className="no_post_msg">
            No Posts Yet !! <br /> What about <br />
            following some of Your Friends ...
          </div>
        ) : (
          <Posts />
        )}
      </div>
      <div className="home_right_panel">
        <Status />

        <FollowerCard />
       
        <FollowingCard />

          
      </div>
      </div>
  );
};

export default Home;
