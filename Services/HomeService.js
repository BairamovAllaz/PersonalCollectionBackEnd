const sequelize = require("sequelize");
const Collection = require("../Models/Collection");
const Item = require("../Models/Item");
const ItemLikes = require("../Models/ItemLikes");
const ItemTags = require("../Models/ItemTags");
const User = require("../Models/UserModel");
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
      const response = await User.findAll({
        include: [
          {
            model: Collection,
            required: false,
            include: [
              {
                model: Item,
                required: false,
                include: [
                  {
                    model: ItemLikes,
                    required: false,
                  },
                  {
                    model: ItemTags,
                  },
                ],
              },
            ],
            order: [[{ model: Item, as: "items" }, "createdAt", "DESC"]],
          },
        ],
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = HomeService;
