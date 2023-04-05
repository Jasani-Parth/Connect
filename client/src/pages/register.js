import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";

import companyLogo from "../images/logo.png";
import companyLogoText from "../images/logo_Text.png";

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="signUp_page">
      <div className="content">
        <div className="signup_header">
          <div className="company_logo">
            <img src={companyLogo} alt="Logo"></img>
          </div>
          <div className="company_logo_text">
            <img src={companyLogoText} alt="Logo"></img>
          </div>
        </div>
        <div className="signUp_zone">
          <div className="signUp_left_part">
            <form onSubmit={handleSubmit} className="signUp_form">
              <h3 className="text-center mb-4">Welcome New User</h3>

              <div className="container" style={{ marginTop: "40px" }}>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="fullname">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        name="fullname"
                        onChange={handleChangeInput}
                        value={fullname}
                        style={{
                          background: `${alert.fullname ? "#fd2d6a14" : ""}`,
                        }}
                      />

                      <small className="form-text text-danger">
                        {alert.fullname ? alert.fullname : ""}
                      </small>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="username">User Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        onChange={handleChangeInput}
                        value={username.toLowerCase().replace(/ /g, "")}
                        style={{
                          background: `${alert.username ? "#fd2d6a14" : ""}`,
                        }}
                      />

                      <small className="form-text text-danger">
                        {alert.username ? alert.username : ""}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="email"
                        onChange={handleChangeInput}
                        value={email}
                        style={{
                          background: `${alert.email ? "#fd2d6a14" : ""}`,
                        }}
                      />

                      <small className="form-text text-danger">
                        {alert.email ? alert.email : ""}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>

                      <div className="pass">
                        <input
                          type={typePass ? "text" : "password"}
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={handleChangeInput}
                          value={password}
                          name="password"
                          style={{
                            background: `${alert.password ? "#fd2d6a14" : ""}`,
                          }}
                        />

                        <small
                          onClick={() => setTypePass(!typePass)}
                          style={{ cursor: "pointer" }}
                        >
                          {typePass ? "Hide" : "Show"}
                        </small>
                      </div>

                      <small className="form-text text-danger">
                        {alert.password ? alert.password : ""}
                      </small>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="cf_password">Confirm Password</label>

                      <div className="pass">
                        <input
                          type={typeCfPass ? "text" : "password"}
                          className="form-control"
                          id="cf_password"
                          onChange={handleChangeInput}
                          value={cf_password}
                          name="cf_password"
                          style={{
                            background: `${
                              alert.cf_password ? "#fd2d6a14" : ""
                            }`,
                          }}
                        />

                        <small
                          onClick={() => setTypeCfPass(!typeCfPass)}
                          style={{ cursor: "pointer" }}
                        >
                          {typeCfPass ? "Hide" : "Show"}
                        </small>
                      </div>

                      <small className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ""}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="row justify-content-between mx-0 mb-1">
                      <label htmlFor="male">
                       
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          defaultChecked
                          onChange={handleChangeInput}
                          style={{marginRight:"10px"}}
                        />
                         Male {" "}
                      </label>

                      <label htmlFor="female">
                        
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          onChange={handleChangeInput}
                          style={{marginRight:"10px"}}
                        />
                        Female{" "}
                      </label>

                      <label htmlFor="other">
                        
                        <input
                          type="radio"
                          id="other"
                          name="gender"
                          value="other"
                          onChange={handleChangeInput}
                          style={{marginRight:"10px"}}
                        />
                        Other{" "}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row" style={{marginTop:"50px"}}>
                  <div className="col text-center">
                    <button type="submit" className="entry_btn2">
                      Register
                    </button>
                  </div>
                </div>
              </div>

            </form>
          </div>
          <div className="signIn_right_part">
            <h1>
              Already <br />a user ?{" "}
            </h1>
            <p>
              Then what are <br />
              you waiting for...hop on !!
            </p>
            <Link to="/">
              <button className="entry_btn1" style={{ marginTop: "50px" }}>
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
