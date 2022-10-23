const ItemService = require("../Services/itemService");
const io = require("../app");
class ItemController {
  static async apiCreateItemWithFields(req, res, next) {
    const collectionId = req.params.collectionId;
    const fields = JSON.parse(req.body.fields);
    const selectedTags = JSON.parse(req.body.selectedTags);
    const itemName = req.body.itemName;
    const image = req.file.path;

    const ItemId = await ItemController.CreateItem(
      itemName,
      selectedTags,
      collectionId,
      image
    );
    const resField = await ItemController.CreateItemFields(fields, ItemId);
    res.status(200).send("Fields created");
  }

  static async CreateItem(itemName, selectedTags, collectionId, image) {
    const itemId = await ItemService.CreateItemWithName(
      itemName,
      collectionId,
      image
    );
    for (const tagElement of selectedTags) {
      const t = await ItemService.CreateItemTags(tagElement.name, itemId);
    }
    return itemId;
  }

  static async CreateItemFields(fields, itemId) {
    for (const element of fields) {
      const response = await ItemService.ItemFieldsAdd(
        element.field_name,
        element.field_value,
        element.field_type,
        itemId
      );
    }
    return true;
  }

  static async apiGetAllCollectionItems(req, res, next) {
    const { userId, collectionId } = req.params;
    const response = await ItemService.GetAllCollectionItems(
      userId,
      collectionId
    );
    console.log(response);
    res.send(response);
  }

  static async apiGetCollectionItemById(req, res, next) {
    const { userId, collectionId, itemId } = req.params;
    const response = await ItemService.GetCollectionItemById(
      userId,
      collectionId,
      itemId
    );
    res.send(response);
  }

  static async apiGetItemsById(req, res, next) {
    const { itemId } = req.params;
    const response = await ItemService.GetItemsById(itemId);
    res.send(response);
  }

  static async apiGetItemsFields(req, res, next) {
    const { itemId } = req.params;
    const response = await ItemService.GetItemsFields(itemId);
    res.send(response);
  }

  static async apiItemAddLike(req, res, next) {
    const { userId, itemId } = req.body;
    const response = await ItemService.ItemAddLike(itemId, userId);
    res.send("Like added");
  }

  static async apiItemDislike(req, res, next) {
    try {
      const { userId, itemId } = req.params;
      const response = await ItemService.ItemDislike(itemId, userId);
      res.send("DisLike");
    } catch (err) {
      console.log(err);
    }
  }

  static async ApiDeleteItemById(req, res, next) {
    try {
      const { itemId } = req.params;
      const response = await ItemService.DeleteItemById(itemId);
      res.send("Deleted");
    } catch (err) {
      console.log(err);
    }
  }

  static async apiGetItemComments(req, res, next) {
    try {
      const { itemId } = req.params;
      const response = await ItemService.GetItemComments(itemId);
      res.send(response);
    } catch (err) {
      console.log(err);
    }
  }
  static async apiAddComment(req, res, next) {
    try {
      const comment = {
        itemId: req.body.itemId,
        message: req.body.message,
        userId: req.body.userId,
        userFirstname: req.body.userFirstname,
        userPhoto: req.body.userPhoto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const response = await ItemService.AddComment(comment);
      const newo = await ItemService.GetItemComments(comment.itemId);
      io.emit("comments", newo);
      res.send("comment added!");
    } catch (err) {
      console.log(err);
    }
  }

  static async ApiUpdateItemFields(req, res, next) {
    try {
      const { itemId } = req.params;
      JSON.parse(req.body.fields).forEach(async element => {
        const resp = await ItemService.UpdateItemFields(
          itemId,
          element.field_name,
          element.field_value
        );
      });
      if (req.file !== "" && req.file !== undefined) {
        const re = await ItemService.UpdateItem(itemId, "image", req.file.path);
      }
      if (req.body.item_name.length > 0) {
        const re2 = await ItemService.UpdateItem(
          itemId,
          "item_name",
          req.body.item_name
        );
      }
      res.send("Update done");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ItemController;
