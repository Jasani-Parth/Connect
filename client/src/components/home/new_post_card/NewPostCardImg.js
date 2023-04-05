import React, { useState } from "react";
import Carousel from "../../Carousel";

const NewPostCardImg = ({ post, theme }) => {
 

  return (
    <div className="image_holder">
      {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )}
    </div>
  );
};

export default NewPostCardImg;
