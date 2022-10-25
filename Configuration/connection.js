const {Sequelize} = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const database = new Sequelize(process.env.DATABASE,process.env.USER, process.env.DATABASE_PASSWORD,
    {host: process.env.HOST, dialect: "mysql"}
);
module.exports = database;
database.authenticate().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log(err);
})
//FIX CONNECTION TO DATABASE WITH DOTENV FILES