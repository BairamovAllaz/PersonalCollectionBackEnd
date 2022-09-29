const {Sequelize} = require("sequelize");
const database = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD,
    {host: process.env.HOST, dialect: "mysql", operatorsAliases: false}
);
module.exports = database;
//FIX CONNECTION TO DATABASE WITH DOTENV FILES