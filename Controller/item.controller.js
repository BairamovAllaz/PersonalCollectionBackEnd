const ItemService = require("../Services/itemService");

class ItemController {
  static async apiCreateItemWithFields(req, res, next) {
    const collectionId = req.params.collectionId;
    const fields = JSON.parse(req.body.fields);
    const selectedTags = JSON.parse(req.body.selectedTags);
    const itemName = req.body.itemName;
    const image = req.file.filename;

    const ItemId = await ItemController.CreateItem(
      itemName,
      selectedTags,
      collectionId,
      image
    );
    const resField = await ItemController.CreateItemFields(fields,ItemId);
    res.status(200).send("Fields created");
  }

  static async CreateItem(itemName, selectedTags, collectionId,image) {
    const itemId = await ItemService.CreateItemWithName(itemName, collectionId,image);
    for (const tagElement of selectedTags) {
      const t = await ItemService.CreateItemTags(tagElement.name, itemId);
    }
    return itemId;
  }

  static async CreateItemFields(fields,itemId) {
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
    res.send(response);
  }
}

module.exports = ItemController;
