const express = require("express");
const app = express();
app.get("/",(req,res) => {
    res.send("Hello world");
})
const PORT = process.env.PORT || 5100;
app.listen(PORT,() => {
    console.log(`Server runing at : ${PORT}`);
})
