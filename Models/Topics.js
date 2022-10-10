const { Sequelize, DataTypes } = require('sequelize');
const database = require("../Configuration/connection")
const Topics = database.define('topics', {
    Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
    },
    topic_name : {
        type : DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});
module.exports = Topics;