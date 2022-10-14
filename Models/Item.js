const { Sequelize, DataTypes } = require('sequelize');
const database = require("../Configuration/connection")
const {Col} = require("sequelize/lib/utils");
const Collection = require("./Collection");
const Tag = require("./Tags")
const ItemTags = require("./ItemTags");


const Item = database.define('items', {
    Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
    },
    item_name : {
        type : DataTypes.STRING,
        allowNull: false
    },
    collectionId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'collections',
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

Item.hasMany(ItemTags);
ItemTags.belongsTo(Item);
module.exports = Item;