const express = require("express");
const multer = require("./UploaderConfig/uploader")
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const app = express();
const database = require("./DatabaseConfig/connection");
const User = require("./Models/UserModel");
const bcrypt = require("bcrypt");

app.use(passport.initialize());
app.use(passport.session());
require("./passportconfig")(passport);

app.get("/",async (req,res) => {
    res.send("Hello world");
})
app.post("/register",multer.single("image"),async (req,res) => {
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
            image : req.file.image,
            updatedAt: new Date(),
            createdAt: new Date()
        }
        const createdUser = await User.create(user);
        res.status(200).send(createdUser);
    }
})
module.exports = app;