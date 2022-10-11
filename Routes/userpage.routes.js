const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader")
const UserPageController = require("../Controller/UserPage.controller");
router.get("/getCollections/:id",UserPageController.apiGetAllUserCollections);
module.exports = router;