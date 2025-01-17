const express = require("express");
const Router = express.Router();
const user_apiController = require("../../../controllers/api/v1/user_api");

Router.post("/create-session", user_apiController.postSignIn);
Router.post("/create-user", user_apiController.postSignUp);
Router.post("/update_user/:id", user_apiController.updateUser);
module.exports = Router;
