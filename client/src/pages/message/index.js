import React from "react";
import LeftSide from "../../components/message/LeftSide";

import companyLogo from "../../images/logo.png";

const Message = () => {
  return (
    <div className="message">
      <div className="left_side">
        <LeftSide />
      </div>

      <div className="right_side1">
      <img src={companyLogo} alt="Logo" style={{width:"500px"}}></img>
      </div>
    </div>
  );
};

export default Message;
