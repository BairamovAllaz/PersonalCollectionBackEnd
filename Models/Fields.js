const { Sequelize, DataTypes } = require('sequelize');
const database = require("../Configuration/connection")
const {Col} = require("sequelize/lib/utils");
const Item = require("./Item");
const Collection = require("./Collection");
const DataType = require("./DataType");

const Fields = database.define('fields', {
    Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
    },
    field_name : {
        type : DataTypes.STRING,
        allowNull: false
    },
    field_value: {
        type: DataTypes.STRING,
        allowNull : false
    },
    field_type : {
        type : DataTypes.STRING,
        allowNull : null
    },
    collectionId : {
        type: DataTypes.INTEGER,
        references: {
            model: 'collections',
            key: 'Id',
        }
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
module.exports = Fields;