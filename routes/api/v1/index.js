const express = require("express");
const Router = express.Router();

Router.use("/user", require("./user_apiRoutes"));
Router.use("/trip", require("./trip_apiRoutes"));

module.exports = Router;
