const { Sequelize, DataTypes } = require('sequelize');
const database = require("../Configuration/connection")

const User = database.define('users', {
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
    userRole : {
        type : DataTypes.BOOLEAN,
        default : false,
        allowNull : false,
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    }
}, {
    timestamps: false
});
module.exports = User;