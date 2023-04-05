import React, { useState } from "react";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import CardFooter from "../post_card/CardFooter";
import NewContentFooter from "./NewContentFooter";

const NewPostCardContent = ({ post, theme, fullCaption }) => {
  const [readMore, setReadMore] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  return (
    <>
      <div className="post_content_box">
        <div className="top_part">
          <div id="img">
            <Link to={`/profile/${post.user._id}`}>
              <Avatar src={post.user.avatar} size="large-avatar" />
            </Link>
          </div>
          <div id="text">
            <strong>{post.user.username}</strong>
            <br />
            <small>posted {moment(post.createdAt).fromNow()}</small>
          </div>
          <div className="post_menu">
            <span
              className="material-icons"
              id="moreLink"
              data-toggle="dropdown"
            >
              more_horiz
            </span>
            <div className="dropdown-menu">
              {auth.user._id === post.user._id && (
                <>
                  <div className="dropdown-item" onClick={handleEditPost}>
                    <span className="material-icons">create</span> Edit Post
                  </div>
                  <div className="dropdown-item">
                    <span className="material-icons">delete_outline</span>{" "}
                    Remove Post
                  </div>
                </>
              )}
              <div className="dropdown-item">
                <span className="material-icons">content_copy</span> Copy Link
              </div>
            </div>
          </div>
        </div>
        <div
          className="caption"
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            color: theme ? "white" : "#111",
          }}
        >
          <span>
            {post.content.length < 200
              ? post.content
              : readMore
              ? post.content + " "
              : post.content.slice(0, 200) + " . . . "}
          </span>
          {post.content.length > 200 && (
            <span
              className="readMore"
              onClick={() => {
                fullCaption(!readMore);
              }}
            >
              {readMore ? "Hide content" : "Read more"}
            </span>
          )}
        </div>
        <hr />
        <div className="bottom_part">
            <NewContentFooter post={post}/>
        </div>
      </div>
    </>
  );
};

export default NewPostCardContent;
