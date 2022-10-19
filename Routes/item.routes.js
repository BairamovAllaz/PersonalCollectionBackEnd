const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader");
const ItemController = require("../Controller/item.controller");
router.post(
  "/addItem/:collectionId",
  multer.single("image"),
  ItemController.apiCreateItemWithFields
);

router.get(
  "/getAllItems/:userId/:collectionId",
  ItemController.apiGetAllCollectionItems
);
router.get(
  "/getItemsById/:userId/:collectionId/:itemId",
  ItemController.apiGetCollectionItemById
);
router.get("/getItemById/:itemId", ItemController.apiGetItemsById);
router.get("/getAllItemsFileds/:itemId", ItemController.apiGetItemsFields);
router.put("/updateItemFields/:itemId",multer.single("image"), ItemController.ApiUpdateItemFields);
router.post("/addLikeItem", ItemController.apiItemAddLike);
router.delete("/DeleteItemById/:itemId", ItemController.ApiDeleteItemById);
router.get("/ItemDislike/:userId/:itemId", ItemController.apiItemDislike);
router.get("/GetItemComments/:itemId", ItemController.apiGetItemComments);
router.post("/AddComment", ItemController.apiAddComment);
module.exports = router;
