const express = require("express");
const Router = express.Router();
const trip_apiController = require("../../../controllers/api/v1/trip_api");
const passport = require("passport");

Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  trip_apiController.getTrips_api
);
Router.post(
  "/createTripapi",
  passport.authenticate("jwt", { session: false }),
  trip_apiController.createTrip_api
);

module.exports = Router;
