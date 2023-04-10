import React from "react";
import Status from "./Status";
import FollowerCard from "./panel_card/FollowerCard";
import FollowingCard from "./panel_card/FollowingCard";

const RightSideBar = () => {
  return (
    <div className="home_right_panel">
      <Status />
      <FollowerCard />
      <FollowingCard />
    </div>
  );
};

export default RightSideBar;
