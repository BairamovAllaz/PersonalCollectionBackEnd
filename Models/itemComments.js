const { Sequelize, DataTypes } = require("sequelize");
const database = require("../Configuration/connection");

const ItemComments = database.define(
  "itemComments",
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
    },
    userFirstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userPhoto: {
      type: DataTypes.STRING,
      allowNull: false,
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
module.exports = ItemComments;
