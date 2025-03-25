const express = require("express");
const Router = express.Router();
const passport = require("../config/passportLocal");
const passportGoogle = require("../config/google-OAuthConfig");

const userController = require("../controllers/userController");

const upload = require("../config/multerConfig");

Router.get("/signIn", passport.isAuthenticated, userController.getSignIn);
Router.post(
  "/signIn",
  passport.authenticate("local", { failureRedirect: "/user/signIn" }),
  userController.postSignIn
);

Router.get("/signUp", passport.isAuthenticated, userController.getSignUp);
Router.post("/signup", upload.single("avatar"), userController.postSignUp);

Router.get(
  "/profile/:id",
  passport.checkAuthentication,

  userController.getUserProfile
);
Router.get(
  "/updateProfile/:id",
  passport.checkAuthentication,
  userController.getUpdateProfile
);
Router.post(
  "/updateProfile/:id",
  passport.checkAuthentication,
  upload.single("avatar"),
  userController.updateUserProfile
);
Router.post("/signOut", userController.postSignOut);

/*Router.get(
  "/auth/google",
  passportGoogle.authenticate("google", { scope: ["profile", "email"] })
);

Router.get(
  "/google/callback",
  passportGoogle.authenticate("google", {
    failureRedirect: "/user/signIn",
  }),
  userController.postSignIn
);*/
//localhost:3000/user/google/callback
http: module.exports = Router;
