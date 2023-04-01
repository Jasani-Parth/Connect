import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

import companyLogo from "../images/logo.png";
import companyLogoText from "../images/Logo_text_white.png";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const [typePass, setTypePass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };
  return (
    <>
      <div className="signIn_page">
        <div className="content">
          <div className="signup_header">
            <div className="company_logo">
              <img src={companyLogo} alt="Logo"></img>
            </div>
            <div className="company_logo_text">
              <img src={companyLogoText} alt="Logo"></img>
            </div>
          </div>
          <div className="signIn_zone">
            <div className="signIn_left_part">
              <form onSubmit={handleSubmit} className="signIn_form">
                <h3 className="text-center mb-4">And Who might You be ?</h3>

                <div className="container" style={{ marginTop: "50px" }}>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          name="email"
                          aria-describedby="emailHelp"
                          onChange={handleChangeInput}
                          value={email}
                        />
                        <small id="emailHelp">
                          *We'll never share your email with anyone else.
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
                            name="password"
                            onChange={handleChangeInput}
                            value={password}
                          />
                          <small onClick={() => setTypePass(!typePass)} style={{ cursor: "pointer" }}>
                            {typePass ? "Hide" : "Show"}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: "30px" }}>
                    <div className="col text-center">
                      <button
                        type="submit"
                        className="entry_btn3"
                        disabled={email && password ? false : true}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="signUp_right_part">
              <h1>
                Don't have
                <br />
                an account ?{" "}
              </h1>
              <p>
                Delay not a sec more, <br />
                hop on and get onboard !!
              </p>
              <Link to="/register">
                <button className="entry_btn1" style={{ marginTop: "50px" }}>
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
