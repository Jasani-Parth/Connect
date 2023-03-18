const route = require("express").Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/userCtrl");

route.get("/search", auth, userCtrl.searchUser)
route.get("/user/:id", auth, userCtrl.getUser)

module.exports = route;
