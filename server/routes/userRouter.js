const route = require("express").Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/userCtrl");

route.get("/search", auth, userCtrl.searchUser);
route.get("/user/:id", auth, userCtrl.getUser);
route.patch("/user", auth, userCtrl.updateUser);

route.patch("/user/:id/follow", auth, userCtrl.follow);
route.patch("/user/:id/unfollow", auth, userCtrl.unfollow);

route.get("/suggestionsUser", auth, userCtrl.suggestionsUser);
module.exports = route;
