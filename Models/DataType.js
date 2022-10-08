const database = require("../Configuration/connection")
const {Col} = require("sequelize/lib/utils");
const Item = require("./Item");
const Collection = require("./Collection");
const {DataTypes, Sequelize} = require("sequelize");

const DataType = database.define('datatypes', {
    Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
    },
    type_name : {
        type : DataTypes.STRING,
        allowNull: false
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
module.exports = DataType;