import React from 'react'
import Avatar from '../Avatar'

const MsgDisplay = ({user}) => {
  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
      </div>
      <div className="chat_text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos molestiae aliquid ea perferendis reprehenderit tenetur perspiciatis exercitationem aliquam libero quis? Perspiciatis modi beatae distinctio molestias natus fugit quisquam repellendus velit!
      </div>
      <div className="chat_time">
        April 2021
      </div>
    </>
  )
}

export default MsgDisplay
