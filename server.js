const app = require("./app");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./DatabaseConfig/connection")
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 5100;
app.listen(PORT,() => {
    console.log("SERVER LISTENING AT: " + PORT);
})