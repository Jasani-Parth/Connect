import React from "react";
import IntroCard from "./panel_card/IntroCard";
import NavigationCard from "./panel_card/NavigationCard";
import SuggestionsUser from "./SuggestionsUser";

const LeftSideBar = () => {
  return (
    <div className="home_left_panel">
      <IntroCard />
      <NavigationCard />
      <SuggestionsUser />
    </div>
  );
};

export default LeftSideBar;
