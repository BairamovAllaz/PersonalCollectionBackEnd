const bcrypt = require("bcrypt");
const User = require("../Models/UserModel")
const AuthService = require("../Services/AuthService")
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
module.exports = function (passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async (username, password, done) => {
            const response = await AuthService.findUserByEmail(username);
            if (!response) return done(null, false);
            bcrypt.compare(password, response.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                    return done(null, response)
                } else {
                    return done(null, false)
                }
            })
        })
    );
    passport.serializeUser((user, cb) => {
        cb(null, user.Id);
    });
    passport.deserializeUser(async (id, cb) => {
        AuthService.findUserById(id).then(data => {
            cb(null,data);
        }).catch(err => {
            cb(null,false);
        })
    });
}


//TODO FIX DOTENV PROBLEM AND ADD LOGOUT TO AUTH
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
                    email: profile.emails,
                    image : profile.photos[0].image,
                    updatedAt: new Date(),
                    createdAt: new Date()
                }
                done(false,newuser);
            },
        ))

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });
    passport.deserializeUser(async (user, cb) => {
        cb(null,user)
    });

}



