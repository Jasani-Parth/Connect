import React from "react";
import UserCardVertical from "../../UserCardVertical";
import { useSelector } from "react-redux";

const FollowingCard = () => {
  const { auth } = useSelector((state) => state);

  return (
    <>
      <div className="followers_card">
        <div className="text_n_count">
          <div id="text">Following</div>
          <div>
            <button style={{pointerEvents:"none"}}>{auth.user.following.length}</button>
          </div>
        </div>
        <div className="box">
          <div className="follower_box_card">
            {auth.user.following.length === 0 ? (
              <>
                <p>Not Following Anyone Yet :( </p>
              </>
            ) : (
              auth.user.following
                .slice(0, 3)
                .map((u, index) => <UserCardVertical key={u._id} user={u} />)
            )}
          </div>
          <button id="load_more" style={auth.user.following.length>3 ?{display:"auto"}:{opacity:"1", filter:"blur(2px)", pointerEvents:"none"}}>Load More</button>
        </div>
      </div>
    </>
  );
};

export default FollowingCard;
