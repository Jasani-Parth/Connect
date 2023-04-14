import React from "react";
import IntroCard from "../home/panel_card/IntroCard";
import NavigationCard from "../home/panel_card/NavigationCard";
import SuggestionsUser from "../home/SuggestionsUser";
import ChoiceBox from "./cards/ChoiceBox";

const LeftSideProfileBar = ({setSaveTab, saveTab}) => {
  return (
    <div className="profile_left_panel">
      {/* <IntroCard /> */}
      <NavigationCard />
      {/* <SuggestionsUser /> */}
      <ChoiceBox setSaveTab={setSaveTab} saveTab={saveTab}/>
    </div>
  );
};

export default LeftSideProfileBar;
