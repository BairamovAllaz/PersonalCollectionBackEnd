const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader")
const CollectionController = require("../Controller/collection.controller");
router.post("/create",multer.single("image"),CollectionController.apiCreate);
router.get("/getTopics",CollectionController.apiGetAllTopics);
router.get("/getTags",CollectionController.apiGetAllTags);
router.get("/getFields/:collectionId",CollectionController.apiGetCollectionFields);
router.post("/addLikeCollection", CollectionController.apiCollectionAddLike);
router.get(
  "/CollectionDislike/:userId/:collectionId",
  CollectionController.apiCollectionDislike
);

module.exports = router;