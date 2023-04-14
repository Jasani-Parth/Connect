import React, { useEffect, useState } from "react";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import Saved from "../../components/profile/Saved";
import { useDispatch, useSelector } from "react-redux";
import LoadIcon from "../../images/loading.gif";
import { getProfileUsers } from "../../redux/actions/profileAction";
import { useParams } from "react-router-dom";
import LeftSideProfileBar from "../../components/profile/LeftSideProfileBar";
import RightSideProfileBar from "../../components/profile/RightSideProfileBar";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";


import Followers from "../../components/profile/Followers";
import Following from "../../components/profile/Following";

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);
  const dispatch = useDispatch();

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [CurrentUser, setCurrentUser] = useState([]);

 
  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
    if (id === auth.user._id) {
      setCurrentUser(auth.user);
      // console.log("u", auth.user);
    } else {
      // dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setCurrentUser(newData[0]);
      // console.log("d",newData[0]);
    }
  
  
  }, [id, profile.ids, auth, dispatch, profile.users]);



  return (
    <div className="profile">
      <LeftSideProfileBar setSaveTab={setSaveTab} saveTab={saveTab}/>
      


      {showFollowers && 
            <Followers
              users={CurrentUser.followers}
              setShowFollowers={setShowFollowers}
            />
      }
     {showFollowing && (
            <Following
              users={CurrentUser.following}
              setShowFollowing={setShowFollowing}
            />
          )}




      <div className="profile_central_panel">
        <div className="profile_content">
          <Info auth={auth} profile={profile} dispatch={dispatch} id={id} 
          showFollowers={showFollowers} showFollowing={showFollowing} setShowFollowers={setShowFollowers} setShowFollowing={setShowFollowing}
          setCurrentUser={setCurrentUser}/>
        </div>

        <div className="profile_gallery">
        {profile.loading ? (
          <img className="d-block mx-auto my-4" src={LoadIcon} alt="loading" />
        ) : (
          <>
            {saveTab ? (
              <Saved auth={auth} dispatch={dispatch} />
            ) : (
              <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
            )}
          </>
        )}
        </div>


      </div>

      <RightSideProfileBar  setShowSuggestions={setShowSuggestions} setShowFollowers={setShowFollowers} setShowFollowing={setShowFollowing}/>
    </div>
  );
};

export default Profile;
