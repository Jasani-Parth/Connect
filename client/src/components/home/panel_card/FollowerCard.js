import React from "react";
import UserCardVertical from "../../UserCardVertical";
import { useSelector } from "react-redux";

const FollowerCard = () => {
  const { auth } = useSelector((state) => state);

  return (
    <>
      <div className="followers_card">
        <div className="text_n_count">
          <div id="text">Followers</div>
          <div>
            <button disabled="true">{auth.user.followers.length}</button>
          </div>
        </div>
        <div className="box">
          <div className="follower_box_card">
            {auth.user.followers.length === 0 ? (
              <>
                <p>No Followers Yet ! invite some ... </p>
              </>
            ) : (
              auth.user.followers
                .slice(0, 3)
                .map((u, index) => <UserCardVertical key={u._id} user={u} />)
            )}
          </div>
          <button id="load_more" style={auth.user.followers.length>3 ?{display:"auto"}:{opacity:"1", filter:"blur(2px)", pointerEvents:"none"}}>Load More</button>
        </div>
      </div>
    </>
  );
};

export default FollowerCard;
