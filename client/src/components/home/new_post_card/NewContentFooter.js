import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Send from "../../../images/send.svg";
import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import { likePost, unLikePost } from "../../../redux/actions/postAction";

const NewContentFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };
  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth }));
    setLoadLike(false);
  };

  return (
    <>
      <div className="left">
        <div className="likes">
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <label>{post.likes.length} likes</label>
        </div>
        <div className="comments">
          <button>{post.comments.length} </button>
          <label> comments</label>
        </div>
      </div>
      <div className="right">
        <div>
          <i className="fas fa-bookmark" />
        </div>
        <div className="roww">
          <div className="chat">
            <Link to={`/post/${post._id}`} className="text-dark">
              <i className="fas fa-comments" />
            </Link>
          </div>
          <div className="send">
            <i className="fas fa-paper-plane" />
            {/* <img src={Send} alt="Send" style={{opacity:"30%"}}/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewContentFooter;
