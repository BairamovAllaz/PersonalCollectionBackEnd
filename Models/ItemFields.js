const { Sequelize, DataTypes } = require("sequelize");
const database = require("../Configuration/connection");

const ItemField = database.define(
  "itemFields",
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    field_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    field_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    field_type: {
      type: DataTypes.STRING,
      allowNull: null,
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: "items",
        key: "Id",
      },
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = ItemField;
