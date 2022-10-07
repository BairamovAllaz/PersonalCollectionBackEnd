const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");

dotenv.config();
//MIDDLEWARES
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000"]
    })
);
app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.set("trust proxy", 1); // trust first proxy


app.use("/uploads",require("express").static("uploads"));
app.use(session({ secret: 'anything' }));
require("./Configuration/passportconfig")(passport);
//TODO FIX OAUTH2 GOOGLE
//require("./Configuration/GoogleAuthConfig")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
///

//INIT ROUTES

const authRoute = require("./Routes/auth.routes");
app.use("/v1",authRoute);
app.get("/",(req,res) => {
    console.log(req.user);
    res.send("Hello user");
})

module.exports = app;