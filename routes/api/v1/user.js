const express = require("express");
const router = express.Router();
const userApi = require("../../../controllers/api/v1/userController");
const passport = require("passport");
router.post("/login", userApi.login);

router.post("/signup", userApi.register);

router.patch(
  "/reset-password",
  passport.authenticate("jwt", { session: false }),
  userApi.resetPassword
);

router.get("/profile",passport.authenticate("jwt",{session:false}),userApi.getProfileApi);


module.exports = router;
