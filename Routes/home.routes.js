const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader");
const HomeController = require("../Controller/Home.controller.js")

router.get("/GetLargestCollections",HomeController.apiGetLargestCollections)
router.get("/GetItemsByDate",HomeController.apiGetItemsByDate)

module.exports = router;