import React from "react";
import Avatar from "./Avatar";
import { Link } from 'react-router-dom'

const UserCardVertical = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing }) => {

  const handleCloseAll = () => {
    if(handleClose) handleClose()
    if(setShowFollowers) setShowFollowers(false)
    if(setShowFollowing) setShowFollowing(false)
  }

  return (
    <div className="user_card_vert">
      
        <Link to={`/profile/${user._id}`} onClick={handleCloseAll} >
          <Avatar src={user.avatar} size="vertical-avatar" />
          <div className="text">
            <span className="">{user.username}</span> <br/>
            {/* <small style={{ opacity: "0.8"}}>{user.fullname}</small> */}
          </div>
        </Link>
      
    </div>
  );
};

export default UserCardVertical;
