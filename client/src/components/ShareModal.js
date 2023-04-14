import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";

const ShareModal = ({ url, theme }) => {
  return (
    <div
      className="share_icons_box"
      style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    >
      <FacebookShareButton url={url}>
        <FacebookIcon round={true} size={32} borderRadius={18}/>
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon round={true} size={32} borderRadius={18}/>
      </TwitterShareButton>

      <EmailShareButton url={url}>
        <EmailIcon round={true} size={32} borderRadius={18}/>
      </EmailShareButton>

      <RedditShareButton url={url}>
        <RedditIcon round={true} size={32} borderRadius={18}/>
      </RedditShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon round={true} size={32} borderRadius={18}/>
      </TelegramShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon round={true} size={32} borderRadius={18}/>
      </WhatsappShareButton>
    </div>
  );
};

export default ShareModal;
