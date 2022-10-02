const AuthService = require("../Services/AuthService");
const passport = require("passport");
const crypto = require("crypto");
const bcrypt = require("bcrypt")
var nodemailer = require("nodemailer");

class AuthController {
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
        //
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


   static async apiForgotPassword(req,res,next) {
       const {email} = req.body;
       const userWithemail = await AuthService.findUserByEmail(email);
       if (!userWithemail) {
           return res.status(404).send("User dont founded");
       }
       const resetToken = crypto.randomUUID().toString();
       const hash = await bcrypt.hash(resetToken, 10);
       const createdToken = await AuthService.CreateToken(userWithemail.Id,hash);
       const link = `http://localhost:5100/forgot-password/${userWithemail.Id}/${createdToken.token}`;
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
       res.send(link);
   }

    static async apiForgotPasswordPost(req,res,next) {
       const {password,passwordVerify} = req.body;
       const {userId,token} = req.params;
        if(password !== passwordVerify) {
            return res.status(404).send("Password need to be same");
        }
        const response = await AuthService.GetTokenByToken(token);
        if(!response) {
            return res.status(404).send("This token doesnt exsist");
        }
        const salt = 10;
        const hashpassword = await bcrypt.hash(password, salt);
        const updateSuccess = await AuthService.UpdateUserPassword(userId,hashpassword);
        if(!updateSuccess) {
            return res.send("Error");
        }
        const isDelete = await AuthService.DeleteToken(token);
        res.status(200).send("Update succesfuly");
   }

}
module.exports = AuthController;