const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader");
const AuthController = require("../Controller/auth.controller");
router.post("/register",multer.single("image"),AuthController.apiRegisterUser)
router.get("/User",AuthController.apiGetAuthUser);
router.post("/login",AuthController.apiLoginUser);
router.post("/forgot-password",AuthController.apiForgotPassword);
router.put("/forgot-password/:userId/:token",AuthController.apiForgotPasswordPost);
module.exports = router;