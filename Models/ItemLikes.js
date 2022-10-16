const { Sequelize, DataTypes } = require("sequelize");
const database = require("../Configuration/connection");

const ItemLikes = database.define(
  "itemLikes",
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: "items",
        key: "Id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "Id",
      },
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
module.exports = ItemLikes;
