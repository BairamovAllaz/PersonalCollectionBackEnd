const {Sequelize} = require("sequelize");
const database = new Sequelize("personalcollection","root", "Yunona701701",
    {host: "localhost", dialect: "mysql"}
);
module.exports = database;
database.authenticate().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log(err);
})
//FIX CONNECTION TO DATABASE WITH DOTENV FILES