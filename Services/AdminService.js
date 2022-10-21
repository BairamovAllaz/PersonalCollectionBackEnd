const User = require("../Models/UserModel");
class AdminService {
  static async GetAllUsers() {
    try {
      const response = await User.findAll({
        where: { isDelete: false },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async DeleteUserById(userId) {
    try {
      const response = await User.update(
        { isDelete: true },
        {
          where: {
            Id: userId,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async UpdateUserToAdmin(userId) {
    try {
      const response = await User.update(
        { userRole: true },
        {
          where: {
            Id: userId,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async RemoveFromAdmin(userId) {
    try {
      const response = await User.update(
        { userRole: false },
        {
          where: {
            Id: userId,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async GetDeletedUsers() {
    try {
      const response = await User.findAll({ where: { isDelete: true } });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async ReturnUserById(userId) {
    try {
      const response = await User.update(
        { isDelete: false },
        { where: { isDelete: true } }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = AdminService;
