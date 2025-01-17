const express = require("express");
const Router = express.Router();
const user_apiController = require("../../../controllers/api/v1/user_api");

Router.post("/create-session", user_apiController.postSignIn);

module.exports = Router;
