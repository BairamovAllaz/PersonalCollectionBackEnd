const bcrypt = require("bcrypt");
const User = require("./Models/UserModel")
const LocalStrategy = require("passport-local").Strategy;
module.exports = function (passport) {
    passport.use(
        new LocalStrategy({usernameField:'email',passwordField: 'password'},(username, password, done) => {
            User.findOne({
                where: {
                    email: username
                }
            }).then(data => {
                if (!data) return done(null, false);
                bcrypt.compare(password, data.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, data)
                    } else {
                        return done(null, false)
                    }
                })
            }).catch(err => {
                console.log(err.message);
                console.log("Here");
            })
        })
    );
    passport.serializeUser((user, cb) => {
        cb(null, user);
    });
    passport.deserializeUser((id, cb) => {
        User.findOne({
            where: {
                id: id
            }
        }).then(data => {
            cb(null, data);
        }).catch(err => {
            cd(null,false);
        })
    });
}


