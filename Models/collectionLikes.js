const { Sequelize, DataTypes } = require("sequelize");
const database = require("../Configuration/connection");

const CollectionLikes = database.define(
  "collectionLikes",
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    collectionId: {
      type: DataTypes.INTEGER,
      references: {
        model: "collections",
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
module.exports = CollectionLikes;
