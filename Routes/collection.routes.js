const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader")
const CollectionController = require("../Controller/collection.controller");
router.post("/create",multer.single("image"),CollectionController.apiCreate);
router.get("/getTopics",CollectionController.apiGetAllTopics);
router.get("/getTags",CollectionController.apiGetAllTags);
router.get("/getFields/:collectionId",CollectionController.apiGetCollectionFields);
router.put("/addFieldsValue/:collectionId",CollectionController.apiUpdateCollectionFields);
module.exports = router;