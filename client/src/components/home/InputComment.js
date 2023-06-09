import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent("");

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    // console.log(newComment);
    // console.log(newComment);
    dispatch(createComment({ post, newComment, auth }));

    if (setOnReply) return setOnReply(false);
  };
  return (
    
      <form className="comment_input" onSubmit={handleSubmit}>
        {children}
        <input
          type="text"
          name=""
          placeholder="Add your comments"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit" className="postBtn">
          Send
        </button>
      </form>
  );
};

export default InputComment;
