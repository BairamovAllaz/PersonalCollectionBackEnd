const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader");
const HomeController = require("../Controller/Home.controller.js")

router.get("/GetLargestCollections",HomeController.apiGetLargestCollections)
router.get("/GetItemsByDate",HomeController.apiGetItemsByDate)
router.get("/FullTextSearch/:key", HomeController.apiFullTextSearchCollection);
module.exports = router;