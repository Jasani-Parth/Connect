const route = require("express").Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/userCtrl");

route.get("/search", auth, userCtrl.searchUser);

module.exports = route;
