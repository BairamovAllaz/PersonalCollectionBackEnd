const CollectionDatabase = require("../Models/Collection");
const CollectionLikes = require("../Models/collectionLikes");
const Item = require("../Models/Item");
const User = require("../Models/UserModel");
class UserPageService {
  l;
  static async GetAllUserColectionsById(id) {
    try {
      const response = await User.findAll({
        where: {
          Id: id,
        },
        include: [
          {
            model: CollectionDatabase,
            required: false,
            where: {
              isDelete: false,
            },
            include: [
              { model: CollectionLikes,required : false },
              { 
                model: Item,
                required: false, 
                where: { isDelete: false } },
            ],
          },
        ],
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async UpdateUserFields(keyf, field, id) {
    try {
      const response = await User.update(
        { [keyf]: field },
        {
          where: {
            id: id,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async GetUserById(userId) {
    try {
      const response = await User.findAll({
        where: {
          Id: userId,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = UserPageService;
