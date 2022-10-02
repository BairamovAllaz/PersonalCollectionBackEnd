const AuthService = require("../Services/AuthService");
const passport = require("passport");
const bcrypt = require("bcrypt")
///TODO FIX REQ.USER
module.exports = class AuthController {

    static async apiLoginUser(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) throw err;
            if (!user) {
                res.status(501).send("User dont exsist")
            } else {
                req.login(user, (err) => {
                    if (err) throw err;
                    res.send("Successfuly authenticate");
                })
                req.user = user;
            }
        })(req, res, next);
    }

    static async apiRegisterUser(req, res, next) {
        //TODO FIX validateEmail
        // if (!this.constructor.validateEmail(req.body.email)) {
        //     return res.status(401).send("Email syntax is not good!");
        // }
        const user = await AuthService.findUserByEmail(req.body.email);
        if (user) {
            res.status(404).send("User already exsist")
        }
        if (!user) {
            const salt = 10;
            const hashpassword = await bcrypt.hash(req.body.password, salt);
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashpassword,
                image: req.file.filename,
                updatedAt: new Date(),
                createdAt: new Date()
            }
            const createdUser = await AuthService.CreateUser(user);
            res.status(200).send(createdUser);
        }
    }

    static async apiGetAuthUser(req,res,next) {
        res.json(req.user);
    }

    static validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
}