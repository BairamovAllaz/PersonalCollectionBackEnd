const AuthService = require("../Services/AuthService");
const passport = require("passport");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const https = require("https");
const { response } = require("express");
const { underscoredIf } = require("sequelize/lib/utils");

class AuthController {
  static async apiLoginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) {
        res.status(501).send("User dont exsist or Blocked by Admins");
      } else {
        req.login(user, err => {
          if (err) throw err;
          res.send(user);
        });
        req.user = user;
      }
    })(req, res, next);
  }

  static async apiRegisterUser(req, res, next) {
    if (!AuthController.validateEmail(req.body.email)) {
      return res.status(501).send("Invalid email syntax");
    }
    const user = await AuthService.findUserByEmail(req.body.email);
    if (user) {
      return res.status(404).send("User already exsist");
    }
    if (!user) {
      const salt = 10;
      const hashpassword = await bcrypt.hash(req.body.password, salt);
      let image = req.file.path;

      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashpassword,
        userRole: 0,
        image: image,
        authType: "login",
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      const createdUser = await AuthService.CreateUser(user);
      res.send(true);
    }
  }
  static async apiGetAuthUserById(req, res, next) {
    const userId = req.params.id;
    const user = await AuthService.findUserById(userId);
    res.send(user);
  }

  static async apiGetUser(req, res, next) {
    console.log(req.user);
    if (req.user === null || req.user === undefined) {
      res.send(null);
    } else {
      res.send(req.user);
    }
  }

  static validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  static async apiForgotPassword(req, res, next) {
    const { email } = req.body;
    const userWithemail = await AuthService.findUserByEmail(email);
    if (!userWithemail) {
      return res.status(404).send("User dont founded");
    }

    const resetToken = crypto.randomUUID().toString();
    const hash = await bcrypt.hash(resetToken, 10);
    const createdToken = await AuthService.CreateToken(
      userWithemail.Id,
      hash.replace("/", "")
    );
    const link = `https://main--sprightly-boba-3c9eab.netlify.app/${userWithemail.Id}/${createdToken.token}`;
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
    const { password, passwordVerify } = req.body;
    const userId = req.params["userId"];
    const token = req.params["token"];
    if (password !== passwordVerify) {
      return res.status(404).send("Password need to be same");
    } else {
      const response = await AuthService.GetTokenByToken(token);
      if (!response) {
        return res.status(404).send("This token doesnt exsist");
      } else {
        const salt = 10;
        const hashpassword = await bcrypt.hash(password, salt);
        const updateSuccess = await AuthService.UpdateUserPassword(
          userId,
          hashpassword
        );
        if (!updateSuccess) {
          return res.send("Error");
        }
        const isDelete = await AuthService.DeleteToken(token);
        res.status(200).send("Update succesfuly");
      }
    }
  }

  static async apiCheckTokenExist(req, res, next) {
    const { token } = req.body;
    const response = await AuthService.GetTokenByToken(token);
    if (response) {
      res.send(true);
    } else {
      res.send(false);
    }
  }

  static async apiGoogleAuthCallBack(req, res, next) {
    passport.authenticate("google", {
      successRedirect: "https://main--sprightly-boba-3c9eab.netlify.app",
      failureRedirect:
        "https://main--sprightly-boba-3c9eab.netlify.app/fail/google",
    })(req, res, next);
  }

  //TODO FIX LOGOUT FOR GOOGLE
  static async apiLogOut(req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.status(200).send("Succesfuly logout");
  }

  static async apiOpenEmail(req, res, next) {
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    })(req, res, next);
  }
}

module.exports = AuthController;
