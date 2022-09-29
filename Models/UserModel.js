const { Sequelize, DataTypes } = require('sequelize');
const database = require("../DatabaseConfig/connection")
const User = database.define('User', {
    Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull : false
    },
    image : {
        type: DataTypes.STRING,
        allowNull : true
    },
    CreatedAt: {
        type: DataTypes.DATE,
        allowNull : false
    }
});