const app = require("./app");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const database = require("./DatabaseConfig/connection")
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser("secretcode"));

const PORT = process.env.PORT || 5100;
app.listen(PORT,() => {
    console.log("SERVER LISTENING AT: " + PORT);
})