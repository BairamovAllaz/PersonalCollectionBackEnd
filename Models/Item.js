const { Sequelize, DataTypes } = require('sequelize');
const database = require("../Configuration/connection")
const {Col} = require("sequelize/lib/utils");
const Collection = require("./Collection");
const Tag = require("./Tags")


const Item = database.define('items', {
    Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type : DataTypes.STRING,
        allowNull: false
    },
    colllectionId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'collections',
            key: 'Id',
        },
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

Item.hasMany(Tag);
module.exports = Item;