const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader")
const CollectionController = require("../Controller/collection.controller");
router.post("/create",multer.single("image"),CollectionController.apiCreate);
router.get("/get",CollectionController.testApi);
module.exports = router;