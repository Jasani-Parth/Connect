import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Send from "../../../images/send.svg";
import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  unLikePost,
  savePost,
  unSavePost,
} from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../utils/config";
import ShareModal from "../../ShareModal";

const NewContentFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  // likes
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

  // saved
  useEffect(() => {
    if (auth.user.saved && auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };
  const handleUnSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
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
        <div className="bookmark">
          {saved ? (
            <i
              className="fas fa-bookmark"
              onClick={handleUnSavePost}
              style={{color:"#0096D1"}}
            />
          ) : (
            <i className="fas fa-bookmark" onClick={handleSavePost} />
          )}
        </div>
        <div className="roww">
          <div className="chat">
            <Link to={`/post/${post._id}`} className="text-dark">
              <i className="fas fa-comments" />
            </Link>
          </div>
          <div className="send">
            <i
              className="fas fa-paper-plane"
              style={isShare ? {color:"#0096D1"}:{}}
              onClick={() => setIsShare(!isShare)}
            />
            {/* <img src={Send} alt="Send" style={{opacity:"30%"}}/> */}
          </div>
        </div>

        {isShare && (
          <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />
        )}
      </div>
    </>
  );
};

export default NewContentFooter;
