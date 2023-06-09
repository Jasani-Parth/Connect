import React, { useState, useEffect, useRef } from "react";
import UserCard from "../UserCard";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
import Icons from "../Icons";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { imageShow } from "../../utils/mediaShow";
import { imageUpload } from "../../utils/imageUpload";
import {
  MESS_TYPES,
  addMessage,
  getMessages,
} from "../../redux/actions/messageAction";
import LoadIcon from "../../images/loading.gif";

const RightSide = () => {
  const { auth, message, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadMedia, SetLoadMedia] = useState(false);

  const refDisplay = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = message.data.find((item) => item._id === id);
    if (newData) {
      setData(newData.messages);
    }
  }, [message.data, auth.user._id, id]);

  useEffect(() => {
    setTimeout(() => {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);

    if (id && message.users.length > 0) {
      const newUser = message.users.find((user) => user._id === id);
      if (newUser) setUser(newUser);
    }
  }, [message.users, id]);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "File doesn't exists.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "image is larger than 5mb.");
      }

      return newMedia.push(file);
    });

    if (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText("");
    setMedia([]);
    SetLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media);

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };

    SetLoadMedia(false);
    await dispatch(addMessage({ msg, auth, socket }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    const getMessagesData = async () => {
      if (message.data.every((item) => item._id !== id)) {
        await dispatch(getMessages({ auth, id }));
        setTimeout(() => {
          refDisplay.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 50);
      }
    };
    getMessagesData();
  }, [id, dispatch, auth, message.data]);

  return (
    <>
      <div className="message_header2">
        {user.length !== 0 && (
          <>
            <UserCard user={user}></UserCard>

            <form className="chat_input" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                  filter: theme ? "invert(1)" : "invert(0)",
                  background: theme ? "#040404" : "",
                  color: theme ? "white" : "",
                }}
              />

              <Icons setContent={setText} content={text} theme={theme} />
              <div className="file_upload"> 
                <i className="fas fa-image text-danger" style={{cursor:"pointer"}}/>
                <input
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleChangeMedia}
                />
              </div>

              <button
                type="submit"
                className="material-icons"
                disabled={text || media.length > 0 ? false : true}
                style={text || media.length > 0 ? {}: {filter:"blur(2px)"}}
              >
                near_me
              </button>
            </form>
          </>
        )}
      </div>

      <div
        className="chat_container"
        style={{ height: media.length > 0 ? "calc(100%,-180px)" : "" }}
      >
        <div className="chat_display" ref={refDisplay}>
          {data.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chat_row other_message">
                  <MsgDisplay user={user} msg={msg} theme={theme} />
                </div>
              )}
              {msg.sender === auth.user._id && (
                <div className="chat_row you_message">
                  <MsgDisplay
                    user={auth.user}
                    msg={msg}
                    theme={theme}
                    data={data}
                  />
                </div>
              )}
            </div>
          ))}

          {loadMedia && (
            <div className="chat_row you_message">
              <img src={LoadIcon} alt="loading" />
            </div>
          )}
        </div>
      </div>

      <div
        className="show_media"
        style={{ display: media.length > 0 ? "grid" : "none" }}
      >
        {media.map((item, index) => (
          <div key={index} id="file_media">
            {imageShow(URL.createObjectURL(item), theme)}
            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default RightSide;
