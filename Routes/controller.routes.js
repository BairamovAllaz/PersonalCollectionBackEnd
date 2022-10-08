const express = require("express");
const router = express.Router();
const CollectionController = require("../Controller/collection.controller");
router.get("/",CollectionController.apiTest);
module.exports = router;