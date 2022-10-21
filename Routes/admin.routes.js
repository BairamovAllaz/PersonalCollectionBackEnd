const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader");
const AdminController = require("../Controller/admin.controller");

router.get("/getAllUsers",AdminController.apiGetAllUsers);
router.get("/GetDeletedUsers", AdminController.apiGetDeletedUsers);
router.put("/ReturnUserById/:userId",AdminController.apiReturnUserById);
router.delete("/DeleteUserById/:userId",AdminController.apiDeleteUserById);
router.put("/updateToAdmin/:userId", AdminController.apiUpdateUserToAdmin);
router.put("/RemoveFromAdmin/:userId", AdminController.apiRemoveFromAdmin);
module.exports = router;