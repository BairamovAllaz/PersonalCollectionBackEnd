const app = require("./app");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const database = require("./DatabaseConfig/connection")
const passport = require("passport");
dotenv.config();


const PORT = process.env.PORT || 5100;
app.listen(PORT,() => {
    console.log("SERVER LISTENING AT: " + PORT);
})