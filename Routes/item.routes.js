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

router.post(
  "/addLikeItem",
  ItemController.apiItemAddLike
);
router.get("/ItemDislike/:userId/:itemId", ItemController.apiItemDislike);

module.exports = router;