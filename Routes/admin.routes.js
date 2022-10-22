const express = require("express");
const router = express.Router();
const multer = require("../Configuration/uploader");
const AdminController = require("../Controller/admin.controller");

router.get("/getAllUsers", AdminController.apiGetAllUsers);
router.get("/GetCountInfo", AdminController.apiGetCountInfo);
router.get("/GetDeletedUsers", AdminController.apiGetDeletedUsers);
router.get("/GetBlockedUsers", AdminController.apiGetBlockedUsers);
router.put("/ReturnUserById/:userId", AdminController.apiReturnUserById);
router.put(
  "/ReturnBlockedUserById/:userId",
  AdminController.apiReturnBlockedUserById
);
router.delete("/DeleteUserById/:userId", AdminController.apiDeleteUserById);
router.put("/BlockUserById/:userId", AdminController.apiBlockUserById);
router.put("/updateToAdmin/:userId", AdminController.apiUpdateUserToAdmin);
router.put("/RemoveFromAdmin/:userId", AdminController.apiRemoveFromAdmin);
module.exports = router;
