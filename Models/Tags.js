const { Sequelize, DataTypes } = require('sequelize');
const database = require("../Configuration/connection")
const {Col} = require("sequelize/lib/utils");
const Item = require("./Item");

const Tags = database.define('tags', {
    Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
    },
    name : {
        type : DataTypes.STRING,
        allowNull: false
    },
    itemId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'items',
            key: 'Id',
        },
    },
    isDelete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
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

module.exports = Tags;