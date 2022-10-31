const Items = require("../Models/Item");
const ItemTags = require("../Models/ItemTags");
const ItemField = require("../Models/ItemFields");
const User = require("../Models/UserModel");
const Collection = require("../Models/Collection");
const ItemLikes = require("../Models/ItemLikes");
const CollectionLikes = require("../Models/collectionLikes");
const ItemComments = require("../Models/itemComments");
class ItemService {
  static async GetAllCollectionItems(userId, collectionId) {
    try {
      const response = await Collection.findAll({
        where: {
          Id: collectionId,
        },
        include: [
          {
            model: Items,
            where: {
              isDelete: false,
            },
            required: false,
            include: [
              {
                model: ItemField,
              },
              {
                model: ItemTags,
              },
              {
                model: ItemLikes,
                required: false,
              },
              {
                model: ItemComments,
                required: false,
              },
            ],
          },
          {
            model: User,
          },
          {
            model: CollectionLikes,
          },
        ],
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async GetCollectionItemById(itemId) {
    try {
      const response = await Items.findAll({
        where: {
          Id: itemId,
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
          {
            model: ItemComments,
          },
          {
            model: Collection,
            include: [
              { model: User },
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

  static async GetItemsById(itemId) {
    try {
      const response = Items.findAll({
        where: {
          Id: itemId,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async GetItemsFields(itemId) {
    try {
      const response = ItemField.findAll({
        where: {
          itemId: itemId,
        },
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
      const res = Items.update(
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

  static async GetItemComments(itemId) {
    try {
      const res = ItemComments.findAll({
        where: {
          itemId: itemId,
        },
        order: [["createdAt", "DESC"]],
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  static async AddComment(comment) {
    try {
      const res = ItemComments.create(comment);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  static async UpdateItemFields(itemId, field_name, field_value) {
    try {
      const response = await ItemField.update(
        { field_value: field_value },
        {
          where: {
            itemId: itemId,
            field_name: field_name,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async UpdateItem(itemId, field_name, field_value) {
    try {
      const response = await Items.update(
        { [field_name]: field_value },
        {
          where: {
            Id: itemId,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = ItemService;