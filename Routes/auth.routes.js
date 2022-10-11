const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader");
const AuthController = require("../Controller/auth.controller");
const dotenv = require("dotenv");
dotenv.config();
router.post("/register",multer.single("image"),AuthController.apiRegisterUser)
router.get("/get/:id",AuthController.apiGetAuthUserById);
router.get("/getuser",AuthController.apiGetUser);
router.post("/login",AuthController.apiLoginUser);
router.get("/logout",AuthController.apiLogOut);
router.post("/forgot-password",AuthController.apiForgotPassword);
router.get("/checkToken",AuthController.apiCheckTokenExist);
router.put("/forgot-password/:userId/:token",AuthController.apiForgotPasswordPost);
router.get('/google', AuthController.apiOpenEmail);

router.get(
    '/api/sessions/google',
    AuthController.apiGoogleAuthCallBack
);

module.exports = router;