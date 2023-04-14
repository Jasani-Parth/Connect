import React, { useState } from "react";
import Posts from "../components/home/Posts";
import { useSelector } from "react-redux";
import LoadIcon from "../images/loading.gif";

import RightSideBar from "../components/home/RightSideBar";
import LeftSideBar from "../components/home/LeftSideBar";

import Followers from "../components/profile/Followers";
import Following from "../components/profile/Following";


const Home = () => {
  const { auth, homePosts } = useSelector((state) => state);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  return (
    <div className="home">
      <LeftSideBar />

      {showFollowers && 
            <Followers
              users={auth.user.followers}
              setShowFollowers={setShowFollowers}
            />
      }
     {showFollowing && (
            <Following
              users={auth.user.following}
              setShowFollowing={setShowFollowing}
            />
          )}


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

      <RightSideBar setShowFollowers={setShowFollowers}  setShowFollowing={setShowFollowing} />
    </div>
  );
};

export default Home;
