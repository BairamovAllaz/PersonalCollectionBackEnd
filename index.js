const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./DatabaseConfig/connection")
const app = express();
dotenv.config();
app.use(cors());
app.get("/",async (req,res) => {
    try {
        try{
            await database.authenticate();
            console.log("connected")
        }catch (e) {
            console.log(e);
        }
    }catch (e) {
        console.log(e);
    }
})
const PORT = process.env.PORT || 5200;
app.listen(PORT,() => {
    console.log(`Server runing at : ${PORT}`);
})
