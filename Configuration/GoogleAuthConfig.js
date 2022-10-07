const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const AuthService = require("../Services/AuthService")
const crypto = require("crypto");

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLEAPIKEYCLIENTID,
                clientSecret: process.env.GOOGLEAPIKEYCLIENTSECRET,
                callbackURL: 'http://localhost:5100/v1/api/sessions/google',
                proxy: true,
            },
            async (accessToken, refreshToken, profile, done) => {
                const newuser = {
                    id: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    image : profile.photos[0].value,
                    password : crypto.randomUUID(),
                    userRole: 0,
                    authType : "google",
                    updatedAt: new Date(),
                    createdAt: new Date()
                }
                const res = AuthService.CreateIfDontExsist(newuser);
                done(false,res);
            },
        ))

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });
    passport.deserializeUser(async (user, cb) => {
        cb(null,user)
    });

}