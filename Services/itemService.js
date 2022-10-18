const Items = require("../Models/Item");
const ItemTags = require("../Models/ItemTags");
const ItemField = require("../Models/ItemFields");
const User = require("../Models/UserModel");
const Collection = require("../Models/Collection");
const Item = require("../Models/Item");
const ItemLikes = require("../Models/ItemLikes");
const CollectionLikes = require("../Models/collectionLikes");
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
            include: [
              {
                model: Item,
                where: {
                  isDelete: false,
                },
                include: [
                  {
                    model: ItemField,
                  },
                  {
                    model: ItemTags,
                  },
                  {
                    model: ItemLikes,
                  },
                ],
              },
              {
                model: CollectionLikes,
              },
            ],
          },
        ],
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async GetItemFields(itemId) {
    try {
      const response = Item.findAll({
        where: {
          Id: itemId,
        },
        include: [
          {
            model: ItemField,
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

  static async ItemAddLike(itemId, userId) {
    try {
      const like = {
        itemId,
        userId,
      };
      const res = await ItemLikes.create(like);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  static async ItemDislike(itemId, userId) {
    try {
      const res = ItemLikes.destroy({
        where: {
          itemId,
          userId,
        },
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  static async DeleteItemById(itemId) {
    try {
      const res = Item.update(
        { isDelete: true },
        {
          where: {
            Id: itemId,
          },
        }
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = ItemService;
