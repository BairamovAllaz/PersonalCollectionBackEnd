const AdminService = require("../Services/AdminService");
class AdminController {
  static async apiGetAllUsers(req, res, next) {
    const users = await AdminService.GetAllUsers();
    res.status(200).send(users);
  }

  static async apiDeleteUserById(req, res, next) {
    const { userId } = req.params;
    const response = await AdminService.DeleteUserById(userId);
    res.status(200).send("Deleted user done");
  }

  static async apiGetCountInfo(req, res, next) {
    const infoObject = await AdminService.GetCountInfo();
    res.status(200).send(infoObject);
  }

  static async apiGetBlockedUsers(req, res, next) {
    const response = await AdminService.GetBlockedUsers();
    res.status(200).send(response);
  }

  static async apiUpdateUserToAdmin(req, res, next) {
    const { userId } = req.params;
    const response = await AdminService.UpdateUserToAdmin(userId);
    res.status(200).send("Update user to admin done");
  }

  static async apiRemoveFromAdmin(req, res, next) {
    const { userId } = req.params;
    const response = await AdminService.RemoveFromAdmin(userId);
    res.status(200).send("Remove user from admin done");
  }

  static async apiGetDeletedUsers(req, res, next) {
    const response = await AdminService.GetDeletedUsers();
    res.status(200).send(response);
  }

  static async apiBlockUserById(req, res, next) {
    const { userId } = req.params;
    const response = await AdminService.BlockUserById(userId);
    res.status(200).send(response);
  }

  static async apiReturnUserById(req, res, next) {
    const { userId } = req.params;
    const response = await AdminService.ReturnUserById(userId);
    res.status(200).send("Ok");
  }

  static async apiReturnBlockedUserById(req, res, next) {
    const { userId } = req.params;
    const response = await AdminService.ReturnBlockedUserById(userId);
    res.status(200).send("Ok");
  }
}

module.exports = AdminController;
