const bcrypt = require("bcrypt");
const User = require("./Models/UserModel")
const localStrategy = require("passport-local").Strategy;
module.exports = function (passport) {
    passport.use(
        new localStrategy((email, password, done) => {
            User.findOne({
                where: {
                    email: email
                }
            }).then(data => {
                if (!data) return done(null, false);
                bcrypt.compare(password, data.password, (err, result) => {
                    if (err) throw err;
                    if (result) {
                        return done(null, data)
                    } else {
                        return done(null, false)
                    }
                })
            }).catch(err => {
                console.log(err);
            })
        })
    );
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        User.findOne({
            where: {
                id: id
            }
        }).then(data => {
            cb(err, data);
        }).catch(err => {
            console.log(err);
        })
    });
}


