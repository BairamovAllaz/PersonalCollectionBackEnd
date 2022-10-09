const { Sequelize, DataTypes } = require('sequelize');
const database = require("../Configuration/connection")
const {Col} = require("sequelize/lib/utils");
const Item = require("./Item");
const Fields = require("./Fields");

const Collection = database.define('collections', {
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
    description : {
        type : DataTypes.STRING,
        allowNull : false
    },
    userId : {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'Id',
        }
    },
    topic : {
        type : DataTypes.STRING,
        allowNull : false
    },
    image : {
        type : DataTypes.STRING,
        allowNull : false
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
Collection.hasMany(Item)
Collection.hasMany(Fields)
Fields.belongsTo(Collection);
module.exports = Collection;