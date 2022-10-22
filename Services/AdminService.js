const Collection = require("../Models/Collection");
const Item = require("../Models/Item");
const User = require("../Models/UserModel");
class AdminService {
  static async GetAllUsers() {
    try {
      const response = await User.findAll({
        where: { isDelete: false, isBlocked: false },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async GetCountInfo() {
    try {
      const infoObject = {};
      infoObject["userCount"] = await User.count({
        where: {
          isDelete: false,
        },
      });
      infoObject["adminCount"] = await User.count({
        where: {
          userRole: true,
          isDelete: false,
        },
      });
      infoObject["countBlockedUsers"] = await User.count({
        where: {
          isBlocked: true,
        },
      });
      infoObject["countDeletedUsers"] = await User.count({
        where: {
          isDelete: true,
        },
      });
      infoObject["countCollections"] = await Collection.count({
        where: {
          isDelete: false,
        },
      });
      infoObject["countItems"] = await Item.count({
        where: {
          isDelete: false,
        },
      });

      return infoObject;
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

  static async BlockUserById(userId) {
    try {
      const response = await User.update(
        { isBlocked: true },
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

  static async GetBlockedUsers() {
    try {
      const response = await User.findAll({ where: { isBlocked: true } });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async ReturnUserById(userId) {
    try {
      const response = await User.update(
        { isDelete: false },
        { where: { id: userId } }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async ReturnBlockedUserById(userId) {
    try {
      const response = await User.update(
        { isBlocked: false },
        { where: { id: userId } }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = AdminService;
