import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../Avatar";
import { getProfileUsers } from "../../redux/actions/profileAction";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import Followers from "./Followers";
import Following from "./Following";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Info = ({
  auth,
  profile,
  dispatch,
  id,
  showFollowers,
  showFollowing,
  setShowFollowers,
  setShowFollowing,
  setCurrentUser
}) => {
  // const { id } = useParams();
  // const { auth, profile } = useSelector((state) => state);
  // const dispatch = useDispatch();
  const { theme } = useSelector((state) => state);

  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  // const [showFollowers, setShowFollowers] = useState(false);
  // const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
      // setCurrentUser([auth.user]);
    } else {
      // dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
      // setCurrentUser(newData);
      // console.log(userData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, dispatch]);

  return (
    <div className="">
    
      {userData.map((user) => (
        <div className="profile_box" key={user._id}>
          <div className="top_cover">
            <img
              src={user.coverphoto}
              alt="loading.."
              style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
            />
          </div>
          <div className="middle_area">
            <Avatar src={user.avatar} size="vertical-big-avatar" />
            <div className="caption">{user.story}</div>
          </div>
          <div className="bottom_area">
            <div className="text">
              <h1>{user.username}</h1>
              <small>@{user.fullname}</small>
            </div>
            <div className="action">
              {user._id === auth.user._id ? (
                <button
                  className="btn btn-outline-info"
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>
          </div>

          {/* <Avatar src={user.avatar} size="supper-avatar" />
          <Avatar src={user.coverphoto} size="supper-avatar" /> */}
          {/* <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>
              {user._id === auth.user._id ? (
                <button
                  className="btn btn-outline-info"
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>

            <div className="follow_btn">
              <span className="mr-4" onClick={() => setShowFollowers(true)}>
                {user.followers.length} Followers
              </span>
              <span className="ml-4" onClick={() => setShowFollowing(true)}>
                {user.following.length} Following
              </span>
            </div>

            <h6>
              {user.fullname}{" "}
              <span className="text-danger"> {user.mobile} </span>
            </h6>
            <p className="m-0">{user.address}</p>
            <h6 className="m-0">{user.email}</h6>

            <i
              className="follow_btn"
              onClick={() => {
                window.open(
                  user.website.startsWith("https://")
                    ? user.website
                    : "https://" + user.website,
                  "_blank",
                  "noreferrer"
                );
              }}
            >
              {user.website}
            </i>
            <p>{user.story}</p>
          </div> */}
          {onEdit && <EditProfile setOnEdit={setOnEdit} />}

          {/*           
          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )} */}
        </div>
      ))}
    </div>
  );
};

export default Info;
