// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/user");
// const crypto = require("crypto");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/user/google/callback",
//     },

//     async function (accessToken, refreshToken, profile, done) {
//       try {
//         let user = await User.findOne({ email: profile.emails[0].value });

//         if (user) {
//           // console.log(profile);
//           // If user found, log them in
//           return done(null, user);
//         } else {
//           // If the user is not found, create them in the database
//           user = await User.create({
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             password: crypto.randomBytes(20).toString("hex"), // Random password
//           });

//           return done(null, user);
//         }
//       } catch (error) {
//         console.log("Error in Google Strategy", error);
//         return done(error, null); // Pass error to Passport
//       }
//     }
//   )
// );
// module.exports = passport;
