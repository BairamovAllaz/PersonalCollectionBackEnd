const express = require("express");
const multer = require("./UploaderConfig/uploader")
const passportLocal = require("passport-local").Strategy;
const app = express();
const database = require("./DatabaseConfig/connection");
const User = require("./Models/UserModel")
const bodyParser = require("body-parser");
const passport = require("passport");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//MIDDLEWARES
app.use(cors());
app.use("/uploads",require("express").static("uploads"));
app.use(cookieParser("secretcode"));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);

require("./passportconfig")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/",async (req,res) => {
    res.send("Hello world");
})
app.post("/register",multer.single("image"),async (req,res) => {
    if(!validateEmail(req.body.email)){
        return res.status(401).send("Email syntax is not good!");
    }
    const u = await User.findOne({
        where : {
            email : req.body.email
        }
    })
    if(u) {
        res.status(404).send("User already exsist")
    }
    if(!u) {
        const salt = 10;
        const hashpassword = await bcrypt.hash(req.body.password,salt);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password : hashpassword,
            image : req.file.filename,
            updatedAt: new Date(),
            createdAt: new Date()
        }
        const createdUser = await User.create(user);
        res.status(200).send(createdUser);
    }
})

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


app.post("/login",(req,res,next) => {
    passport.authenticate('local',(err,user,info) => {
          if(err) throw err;
          if(!user) {
              res.status(501).send("User dont exsist")
          }
          else {
              req.login(user,(err) => {
                  if(err) throw err;
                  res.send("Successfuly authenticate");
              })
          }
      })(req,res,next);
});



module.exports = app;