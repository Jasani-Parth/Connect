import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";

const EditProfile = ({ setOnEdit }) => {
  const initState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, address, website, story, gender } = userData;
  const [avatar, setAvatar] = useState("");
  const [coverphoto, setCoverPhoto] = useState("");
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });

    setAvatar(file);
  };

  const changeCoverPhoto = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);

    if (err) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });
    }

    setCoverPhoto(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, coverphoto, auth }));
  };

  return (
    <div className="edit_profile">
      <form onSubmit={handleSubmit}>
        <div className="col">
          <div className="row">
            <div className="col">
              <label>Profile Picture</label>
              <div className="info_avatar">
                <img
                  src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                  alt="avatar"
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
                <span>
                  <i className="fas fa-camera" />
                  <p>Change</p>
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    accept="image/*"
                    onChange={changeAvatar}
                  />
                </span>
              </div>
            </div>
            <div className="col">
              <label>Cover Picture</label>
              <div className="info_avatar">
                <img
                  src={
                    coverphoto
                      ? URL.createObjectURL(coverphoto)
                      : auth.user.coverphoto
                  }
                  alt="coverphoto"
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
                <span>
                  <i className="fas fa-camera" />
                  <p>Change</p>
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    accept="image/*"
                    onChange={changeCoverPhoto}
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={handleInput}
                  />
                  <small
                    className="text-danger position-absolute"
                    style={{
                      top: "50%",
                      right: "5px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {fullname.length}/25
                  </small>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={mobile}
                  className="form-control"
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  className="form-control"
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  name="website"
                  value={website}
                  className="form-control"
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="story">Story</label>
                <textarea
                  name="story"
                  value={story}
                  cols="30"
                  rows="4"
                  className="form-control"
                  onChange={handleInput}
                />

                <small className="text-danger d-block text-right">
                  {story.length}/200
                </small>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="gender">Gender</label>
              <div className="input-group-prepend px-0 mb-4">
                <select
                  name="gender"
                  id="gender"
                  value={gender}
                  className="custom-select text-capitalize"
                  onChange={handleInput}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button className="btn btn-info w-100 my_button" type="submit">
                Save
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-danger w-100 my_button"
                onClick={() => setOnEdit(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
