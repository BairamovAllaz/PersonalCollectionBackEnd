const app = require("./app");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const database = require("./DatabaseConfig/connection")
const passport = require("passport");
dotenv.config();
app.use(cors());
//.use(require("express").json());

app.use("/uploads",require("express").static("uploads"));
app.use(cookieParser("secretcode"));
// app.use(
//     session({
//         secret: "secretcode",
//         resave: true,
//         saveUninitialized: true,
//     })
// );
require("./passportconfig")(passport);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5100;
app.listen(PORT,() => {
    console.log("SERVER LISTENING AT: " + PORT);
})