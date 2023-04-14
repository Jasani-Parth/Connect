import React from "react";
import UserCardVertical from "../../UserCardVertical";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import LoadIcon from "../../../images/loading.gif";

import { getSuggestions } from "../../../redux/actions/suggestionsAction";

import UserCard from "../../UserCard";
import FollowBtn from "../../FollowBtn";

const SuggestionCard = ({ setShowSuggestions }) => {
  const { auth, suggestion } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <div className="suggestions_card">
        <div className="text_n_count">
          <div id="text">Know Them yet ?</div>
          <div>
            {!suggestion.loading && (
              <button style={{ outline: "none" }}>
                <i
                  className="fas fa-redo"
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(getSuggestions(auth.token))}
                />
              </button>
            )}
          </div>
        </div>
        <div className="box">
          <div className="suggestion_box_card">
            {suggestion.loading ? (
              <img
                src={LoadIcon}
                alt="loading"
                className="d-block mx-auto my-4"
              />
            ) : (
              <>
                {suggestion.users.map((user) => (
                  <UserCard key={user._id} user={user}>
                    <FollowBtn user={user} />
                  </UserCard>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestionCard;
