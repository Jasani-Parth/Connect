import React, {useState} from "react";

import Status from "../home/Status";
import FollowerCard from "../home/panel_card/FollowerCard";
import FollowingCard from "../home/panel_card/FollowingCard";
import SuggestionCard from "./cards/SuggestionCard";
import SuggestionsUser from "../home/SuggestionsUser";
import DetailsCard from "./cards/DetailsCard";

const RightSideProfileBar = ({setShowSuggestions, setShowFollowers, setShowFollowing}) => {
  // const [showFollowers, setShowFollowers] = useState(false);
  // const [showFollowing, setShowFollowing] = useState(false);
  return (
    <div className="profile_right_panel">
      {/* <Status /> */}
      <DetailsCard setShowFollowers={setShowFollowers} setShowFollowing={setShowFollowing}/>
      
      <SuggestionCard setShowSuggestions={setShowSuggestions}/>

      {/* <SuggestionsUser/> */}
    </div>
  );
};

export default RightSideProfileBar;