const sequelize = require("sequelize");
const Collection = require("../Models/Collection");
const Item = require("../Models/Item");
const ItemLikes = require("../Models/ItemLikes");
const ItemTags = require("../Models/ItemTags");
const User = require("../Models/UserModel");
const { Sequelize } = require("sequelize");
const CollectionLikes = require("../Models/collectionLikes");
class HomeService {
  static async getAllCollections() {
    try {
      const response = await Collection.findAll({
        where: {
          isDelete: false,
        },
        include: [{ model: User }, { model: Item }, { model: CollectionLikes }],
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async GetLargestCollections() {
    try {
      const response = await Collection.findAll({
        include: [
          {
            model: User,
          },
        ],
        limit: 5,
        attributes: [
          "Id",
          "name",
          "description",
          "about",
          "userId",
          "topic",
          "image",
          "isDelete",
          "createdAt",
          "updatedAt",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM items WHERE items.collectionId = collections.Id)"
            ),
            "ItemCount",
          ],
        ],
        order: [[sequelize.literal("ItemCount"), "DESC"]],
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async GetItemsByDate() {
    try {
      const response = await Item.findAll({
        where: {
          isDelete: false,
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Collection,
            include: [{ model: User }],
          },
          {
            model: ItemLikes,
            required: false,
          },
          {
            model: ItemTags,
          },
        ],
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async FullTextSearchCollection(key) {
    const response = await Collection.findAll({
      where: Sequelize.literal(
        "MATCH (name,about,topic) AGAINST(:key IN BOOLEAN MODE)"
      ),
      replacements: {
        key: `+${key}*`,
      },
      include: [{ model: User }],
    });
    return response;
  }
}
module.exports = HomeService;
