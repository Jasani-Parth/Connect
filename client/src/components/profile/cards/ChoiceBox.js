import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { Link, useParams } from "react-router-dom";
import { Params } from "react-router-dom";

const ChoiceBox = ({ setSaveTab, saveTab }) => {
  const { auth } = useSelector((state) => state);
  const [hide, setHide] = useState(true);
  const { id } = useParams();
  //   console.log(auth.user.Avatar, auth);
  useEffect(() => {
    // console.log(auth.user._id, id);
    if (auth.user._id === id) {
      setHide(false);
      // console.log("same man");
    }
    else{
      setHide(true);
      // console.log("diff man");
    }
  }, [auth.user._id, id]);

  return (
    <div className="choice_card">
      <div className="bar">
        {hide ? (
          <>
            <button
              id={saveTab ? "" : "active"}
              onClick={() => setSaveTab(false)}
            >
              Posts
            </button>
            <button id="inactive">Saved</button>
          </>
        ) : (
          <>
            <button
              id={saveTab ? "" : "active"}
              onClick={() => setSaveTab(false)}
            >
              Posts
            </button>
            <button
              id={saveTab ? "active" : ""}
              onClick={() => setSaveTab(true)}
            >
              Saved
            </button>
          </>
        )}
      </div>
      {/* <div id="img">
           
        </div>
      <div id="text">
        <strong>
        {auth.user.username}
        </strong>
        <br/> 
        <small>
        @{auth.user.fullname}
        </small>
      </div> */}
    </div>
  );
};

export default ChoiceBox;
