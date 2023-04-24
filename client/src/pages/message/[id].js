import React from "react";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

const Conversation = () => {
  return (
    <div className="message">
      <div className="left_side">
        <LeftSide />
      </div>

      <div className="right_side2">
        <RightSide />
      </div>
    </div>
  );
};

export default Conversation;
