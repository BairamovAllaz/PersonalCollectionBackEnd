const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader");
const AdminController = require("../Controller/admin.controller");

router.get("/getAllUsers",AdminController.apiGetAllUsers);

module.exports = router;