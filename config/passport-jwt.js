const User = require("../models/User");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

passport.use(
  new JwtStrategy(option, async (jwt_payload, done) => {
    try {
      // Use async/await for findById
      const user = await User.findById(jwt_payload._id);
      if (user) {
        return done(null, user); // User found
      } else {
        return done(null, false); // No user found
      }
    } catch (err) {
      console.error("Error finding user from JWT payload:", err);
      return done(err, false); // Handle errors
    }
  })
);
module.exports = passport;
