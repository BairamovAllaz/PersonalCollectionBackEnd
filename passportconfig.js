const bcrypt = require("bcrypt");
const User = require("./Models/UserModel")
const AuthService = require("./Services/AuthService")
const LocalStrategy = require("passport-local").Strategy;
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
        cb(null, user);
    });
    passport.deserializeUser(async (id, cb) => {
        const response = await AuthService.findUserById(id);
        cb(null, response);
    });
}


