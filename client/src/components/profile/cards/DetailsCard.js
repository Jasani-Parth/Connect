import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dispatch } from "react";

const DetailsCard = ({ setShowFollowers, setShowFollowing }) => {
  const { auth, theme, profile } = useSelector((state) => state);
  const { id } = useParams();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      // dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
      // console.log(userData);
    }
  }, [id, auth, profile.users]);

  return (
    <div className="details_card">
      {userData.map((user) => (
        <>
          <div className="details_container">
            <div className="follow_info">
              <div className="comments">
                <button onClick={() => setShowFollowers(true)}>
                  {user.followers.length}{" "}
                </button>
                <label> Followers</label>
              </div>
              <div className="comments">
                <button onClick={() => setShowFollowing(true)}>
                  {user.following.length}{" "}
                </button>
                <label> Following</label>
              </div>
            </div>
            <hr/>
            <div className="personal_info">
              <div className="field">
                <i className="fa fa-phone-square"></i>
                <label>{user.mobile}</label>
              </div>

              <div className="field">
                <i className="fa fa-envelope"></i>
                <label>{user.email}</label>
              </div>

              <div className="field">
                <i className="fas fa-earth"></i>
                <label
                  id="link"
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

                </label>
              </div>

              <div className="field">
                <i className="fa fa-address-card"></i>
                <label>{user.address}</label>
              </div>
            </div>



          </div>
        </>
      ))}
    </div>
  );
};

export default DetailsCard;
