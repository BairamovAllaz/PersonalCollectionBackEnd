const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const AuthService = require("../Services/AuthService");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (username, password, done) => {
        const response = await AuthService.findUserByEmail(username);
        if (!response) return done(null, false);
        bcrypt.compare(password, response.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, response);
          } else {
            return done(null, false);
          }
        });
      }
    )
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLEAPIKEYCLIENTID,
        clientSecret: process.env.GOOGLEAPIKEYCLIENTSECRET,
        callbackURL: "https://personalcollection-itransition.herokuapp.com/v1/api/sessions/google",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        const newuser = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          password: crypto.randomUUID(),
          userRole: 0,
          authType: "google",
          updatedAt: new Date(),
          createdAt: new Date(),
        };
        const res = await AuthService.CreateIfDontExsist(newuser);
        done(false, res);
      }
    )
  );
  passport.serializeUser((user, cb) => {
    cb(null, user.Id);
  });
  passport.deserializeUser((id, cb) => {
    AuthService.findUserById(id).then(data => {
      cb(null, data);
    });
  });
};
