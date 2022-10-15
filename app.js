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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser("secretcode"));

// app.all("/*", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });
app.set("trust proxy", 1); // trust first proxy


app.use(passport.initialize());
app.use(passport.session());
require("./Configuration/passportconfig")(passport);
//TODO FIX OAUTH2 GOOGLE
//require("./Configuration/GoogleAuthConfig")(passport);

///

//INIT ROUTES

const authRoute = require("./Routes/auth.routes");
const controllerRoutes = require("./Routes/collection.routes");
const userpageRoutes = require("./Routes/userpage.routes");
const itemRoutes = require("./Routes/item.routes");
app.use("/v1",authRoute);
app.use("/collection",controllerRoutes);
app.use("/userpage",userpageRoutes)
app.use("/items",itemRoutes)

app.get("/",(req,res) => {
    console.log(req.user);
    res.send("Hello user");
})
app.use("/uploads",express.static("uploads"))
module.exports = app;