const {Sequelize} = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const database = new Sequelize("personalCollection", "root", "ellez2004", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = database;
database.authenticate().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log(err);
})