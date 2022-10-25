const sequelize = require("sequelize");
const Collection = require("../Models/Collection");
const Item = require("../Models/Item");
const ItemLikes = require("../Models/ItemLikes");
const ItemTags = require("../Models/ItemTags");
const User = require("../Models/UserModel");
const { Sequelize } = require("sequelize");
class HomeService {
  static async GetLargestCollections() {
    try {
      const response = await Collection.findAll({
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
        order : [['createdAt','DESC']],
        include: [
          {
            model: Collection,
            include: [{ model: User }],
          },
          {
            model : ItemLikes,
            required : false
          },
          {
            model : ItemTags
          }
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
    });
    return response;
  }
}
module.exports = HomeService;
