const UserPageService = require("../Services/UserPageService");


class UserPageController {
    static async apiGetAllUserCollections(req,res,next) {
        const Id = req.params.id;
        const result = await UserPageService.GetAllUserColectionsById(Id);
        console.log(result);
        res.send(result);
    }

}
module.exports = UserPageController;