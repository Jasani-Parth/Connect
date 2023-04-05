const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      //   console.log(req.body);
      let newUserName = username.toLowerCase().replace(/ /g, "");
      //   console.log(newUserName);

      // checking if username is present or not in database
      const user_name = await Users.findOne({ username: newUserName });
      if (user_name) {
        return res.status(400).json({ msg: "This Username Already Exists." });
      }

      // checking if email is present or not in database
      const user_email = await Users.findOne({ email });
      if (user_email) {
        return res.status(400).json({ msg: "This Email Already Exists." });
      }

      // password validation
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });
      }

      // generating hashed password using bcrypt
      const passwordHash = await bcrypt.hash(password, 12);
      //   console.log(passwordHash);

      // after validating creating new User instance for storing in database
      const newUser = new Users({
        fullname: fullname,
        username: newUserName,
        email: email,
        password: passwordHash,
        gender: gender,
      });
      //   console.log(newUser);

      // validation tokens
      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });
      //   console.log({ access_token, refresh_token });

      // setting-up cookie
      // name : refreshtoken
      // path : /api/refresh_token
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      // add user into database
      await newUser.save();

      res.json({
        msg: "Register Success!!",
        access_token,
        user: { ...newUser._doc, password: "" },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(req.body);
      // checking if email exists or not and if exists then get data
      const user = await Users.findOne({ email }).populate(
        "followers following",
        "-password"
      );

      if (!user) {
        return res.status(400).json({ msg: "User Not Exists." });
      }

      // password varification
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "password is incorrect." });
      }

      // assigning new access token while login
      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });
      //   console.log({ access_token, refresh_token });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        msg: "Login Success!!",
        access_token,
        user: { ...user._doc, password: "" },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      // get the cookie by name
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) {
        return res.status(400).json({ msg: "Please Login now." });
      }

      // if cookie is present we have stored refresh-token in it so get it and verify
      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) {
            return res.status(400).json({ msg: "Please Login now." });
          }

          //   console.log(result);
          // here result returns { id :.. , iat : .. , exp : ..}
          const user = await Users.findById(result.id)
            .select("-password")
            .populate(
              "followers following",
              "avatar username fullname followers following"
            );

          if (!user)
            return res.status(400).json({ msg: "This does not exist." });

          const access_token = createAccessToken({ id: result.id });

          res.json({
            access_token,
            user,
          });
        }
      );

      // if token is not verified then we are not adding user and access_token in response
      // res.json({ rf_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = authCtrl;
