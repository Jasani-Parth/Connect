import React from "react";
import Avatar from "../../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { Link } from "react-router-dom";

const IntroCard = () => {
  const { auth } = useSelector((state) => state);
  //   console.log(auth.user.Avatar, auth);

  return (
    <div className="intro_card">
        <div id="img">
            <Link className="" to={`/profile/${auth.user._id}`}>
                <Avatar src={auth.user.avatar} size="large-avatar" />
            </Link>
        </div>
      <div id="text">
        <strong>
        {auth.user.username}
        </strong>
        <br/> 
        <small>
        @{auth.user.fullname}
        </small>
      </div>
    </div>
  );
};

export default IntroCard;
