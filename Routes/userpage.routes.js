const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader")
const UserPageController = require("../Controller/UserPage.controller");
router.get("/getCollections/:id",UserPageController.apiGetAllUserCollections);
router.put("/updateUser/:id",multer.single("image"),UserPageController.apiUpdateUserFields);
module.exports = router;
