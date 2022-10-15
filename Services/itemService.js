const Items = require("../Models/Item");
const ItemTags = require("../Models/ItemTags");
const ItemField = require("../Models/ItemFields");
const User = require("../Models/UserModel");
const Collection = require("../Models/Collection");
class ItemService {
  static async GetAllCollectionItems(userId, collectionId) {
    try {
      const response = await User.findAll({
        where: {
          Id: userId,
        },
        include: [
          {
            model: Collection,
            where: {
              Id: collectionId,
            },
          },
        ],
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async CreateItemWithName(itemName, collectionId, image) {
    try {
      const item = {
        item_name: itemName,
        collectionId: collectionId,
        image: image,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const response = await Items.create(item);
      return response.Id;
    } catch (err) {
      console.log(err);
    }
  }

  static async CreateItemTags(tagName, itemId) {
    try {
      const tag = {
        tag_name: tagName,
        itemId: itemId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const response = await ItemTags.create(tag);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async ItemFieldsAdd(fieldName, fieldValue, fieldType, itemId) {
    try {
      const field = {
        field_name: fieldName,
        field_value: fieldValue,
        field_type: fieldType,
        itemId: itemId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const response = await ItemField.create(field);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = ItemService;
