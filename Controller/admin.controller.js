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
}

module.exports = AdminController;
