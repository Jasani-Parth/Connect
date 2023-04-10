import React from "react";
import { useSelector, useDispatch } from "react-redux";

import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import LoadIcon from "../../images/loading.gif";
import { getSuggestions } from "../../redux/actions/suggestionsAction";

const SuggestionsUser = () => {
  const { auth, suggestion } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="my-4">
      {/* <UserCard user={auth.user} /> */}
      <div className="d-flex justify-content-between align-items-center my-2">
        <h5 className="text-danger mr-2">People You might know </h5>
        {!suggestion.loading && (
          <i
            className="fas fa-redo"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        )}
      </div>

      {suggestion.loading ? (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <div className="suggestions">
          {suggestion.users.map((user) => (
            <UserCard key={user._id} user={user}>
              <FollowBtn user={user} />
            </UserCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestionsUser;
