const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader");
const CollectionController = require("../Controller/collection.controller");
router.post("/create", multer.single("image"), CollectionController.apiCreate);
router.get("/getTopics", CollectionController.apiGetAllTopics);
router.get("/getTags", CollectionController.apiGetAllTags);
router.get(
  "/getCollectionById/:collectionId",
  CollectionController.apiGetCollectionById
);
router.get(
  "/getFields/:collectionId",
  CollectionController.apiGetCollectionFields
);
router.post("/addLikeCollection", CollectionController.apiCollectionAddLike);
router.get(
  "/CollectionDislike/:userId/:collectionId",
  CollectionController.apiCollectionDislike
);
router.put(
  "/UpdateCollection/:collectionId",
  multer.single("image"),
  CollectionController.apiUpdateCollection
);
router.delete(
  "/Delete/:collectionId",
  CollectionController.apiCollectionDelete
);

module.exports = router;
