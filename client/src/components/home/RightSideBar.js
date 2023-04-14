import React from "react";
import Status from "./Status";
import FollowerCard from "./panel_card/FollowerCard";
import FollowingCard from "./panel_card/FollowingCard";

const RightSideBar = ({setShowFollowers, setShowFollowing}) => {
  return (
    <div className="home_right_panel">
      <Status />
      <FollowerCard setShowFollowers={setShowFollowers}/>
      <FollowingCard setShowFollowing={setShowFollowing}/>
    </div>
  );
};

export default RightSideBar;
