const UserPageService = require("../Services/UserPageService");


class UserPageController {
  static async apiGetAllUserCollections(req, res, next) {
    const Id = req.params.id;
    const result = await UserPageService.GetAllUserColectionsById(Id);
    res.send(result);
  }
  static async apiGetUserById(req, res, next) {
    const { userId } = req.params;
    const result = await UserPageService.GetUserById(userId);
    res.send(result);
  }

  static async apiUpdateUserFields(req, res, next) {
    const id = req.params.id;
    Object.keys(req.body).forEach(function (key) {
      const val = req.body[key];
      UserPageService.UpdateUserFields(key, val, id);
    });
    console.log(req.file);
    if (req.file !== "" && req.file !== undefined) {
      const re = await UserPageService.UpdateUserFields(
        "image",
        req.file.filename,
        id
      );
    }
    res.send("Update done");
  }
}
module.exports = UserPageController;