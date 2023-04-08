import React, { useState } from "react";
import CardHeader from "./home/post_card/CardHeader";
import CardBody from "./home/post_card/CardBody";
import CardFooter from "./home/post_card/CardFooter";

import Comments from "./home/Comments";
import InputComment from "./home/InputComment";
import NewPostCardImg from "./home/new_post_card/NewPostCardImg";
import NewPostCardContent from "./home/new_post_card/NewPostCardContent";

const PostCard = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false);

  // var str = post.content.replace(/(?:\r\n|\r|\n)/g , ' <br> ');
  // var str2 = "abc <br/> abc"
  return (
    <div key={post._id} className="card">
      {/* <CardHeader post={post}/>
            <CardBody post={post}/>
            <CardFooter post={post}/>

            <Comments post={post} />
            <InputComment post={post} /> */}
      <div className={readMore ? "full_caption" : "full_caption_hidden"}>
        <div className="scroll_text">
          {/* <textarea 
          value={post.content} 
          /> */}
          {/* <pre style={{ overflowX:"hidden", overflowY:"scroll"}}>
          { post.content }
          </pre> */}

          {post.content}
        </div>
        <div className="caption_close_btn">
          <button
            onClick={() => {
              setReadMore(!readMore);
            }}
          >
            Close
          </button>
        </div>
      </div>


      <div className="content_zone">
        <div className="post_left_zone">
          <NewPostCardImg post={post} />
        </div>
        <div className="post_right_zone">
          <NewPostCardContent
            post={post}
            theme={theme}
            fullCaption={setReadMore}
          />
        </div>
      </div>

      
      <div className="comment_zone_input">
        <InputComment post={post} />
      </div>
      <div className="comment_zone_output">
        <Comments post={post} />
      </div>
    </div>
  );
};

export default PostCard;
