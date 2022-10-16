const { Sequelize, DataTypes } = require("sequelize");
const database = require("../Configuration/connection");
const ItemTags = require("./ItemTags");
const ItemFields = require("./ItemFields");
const ItemLikes = require("./ItemLikes");
const ItemComments = require("./itemComments");

const Item = database.define(
  "items",
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collectionId: {
      type: DataTypes.INTEGER,
      references: {
        model: "collections",
        key: "Id",
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
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

Item.hasMany(ItemTags);
ItemTags.belongsTo(Item);
Item.hasMany(ItemFields);
ItemFields.belongsTo(Item);

Item.hasMany(ItemLikes);
ItemLikes.belongsTo(Item);

Item.hasMany(ItemComments);
ItemComments.belongsTo(Item);

module.exports = Item;
