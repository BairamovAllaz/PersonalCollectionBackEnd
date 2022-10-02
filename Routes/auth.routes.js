const express = require("express");
const router = express.Router();
const multer = require("../UploaderConfig/uploader");
const AuthController = require("../Controller/auth.controller");

router.post("/register",multer.single("image"),AuthController.apiRegisterUser)
router.post("/login",AuthController.apiLoginUser);

module.exports = router;