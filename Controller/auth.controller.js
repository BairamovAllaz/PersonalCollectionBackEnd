const AuthService = require("../Services/AuthService");
const passport = require("passport");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const https = require("https");
const {response} = require("express");
class AuthController {
    static async apiLoginUser(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) throw err;
            if (!user) {
                res.status(501).send("User dont exsist")
            } else {
                req.login(user, (err) => {
                    if (err) throw err;
                    res.send(user);
                })
                req.user = user;
            }
        })(req, res, next);
    }

    static async apiRegisterUser(req, res, next) {
        if(!AuthController.validateEmail(req.body.email)) {
            return res.status(501).send("Invalid email syntax");
        }
        const user = await AuthService.findUserByEmail(req.body.email);
        if (user) {
            return res.status(404).send("User already exsist")
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

    static async apiGetAuthUser(req, res, next) {
        res.json(req.user);
    }

     static validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    static async apiForgotPassword(req, res, next) {
        const {email} = req.body;
        const userWithemail = await AuthService.findUserByEmail(email);
        if (!userWithemail) {
            return res.status(404).send("User dont founded");
        }

        const resetToken = crypto.randomUUID().toString();
        const hash = await bcrypt.hash(resetToken, 10);
        const createdToken = await AuthService.CreateToken(userWithemail.Id, hash.replace('/', ""));
        const link = `http://localhost:5100/v1/forgot-password/${userWithemail.Id}/${createdToken.token}`;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset",
            text: link,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        res.send("We sended recovery link check your email");
    }

    static async apiForgotPasswordPost(req, res, next) {
        const {password, passwordVerify} = req.body;
        const userId = req.params["userId"];
        const token = req.params["token"];
        console.log(userId, token);
        if (password !== passwordVerify) {
            return res.status(404).send("Password need to be same");
        } else {
            const response = await AuthService.GetTokenByToken(token);
            if (!response) {
                return res.status(404).send("This token doesnt exsist");
            } else {
                const salt = 10;
                const hashpassword = await bcrypt.hash(password, salt);
                const updateSuccess = await AuthService.UpdateUserPassword(userId, hashpassword);
                if (!updateSuccess) {
                    return res.send("Error");
                }
                const isDelete = await AuthService.DeleteToken(token);
                res.status(200).send("Update succesfuly");
            }
        }
    }

    static async apiGoogleAuthCallBack(req,res,next) {
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/login',
        })(req,res,next)
    }


    //TODO FIX LOGOUT FOR GOOGLE
    static async apiLogOut(req,res,next) {
        req.logout(function (err) {
            if(err) {
                return next(err);
            }
            const response = https.get("https://accounts.google.com/logout");
        })
        res.status(200).send("Succesfuly logout");
    }

    static async apiOpenEmail(req,res,next) {
        passport.authenticate('google', { scope: ['profile'] })(req,res,next)
    }
}

module.exports = AuthController;