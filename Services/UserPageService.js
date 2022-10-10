const CollectionDatabase = require("../Models/Collection");
class UserPageService {
l
    static async GetAllUserColectionsById(id)  {
        try {
            const response = await CollectionDatabase.findAll({
                where : {
                    userId : id
                }
            });
            return response;
        } catch(err) {
            console.log(err);
        }
    }

}
module.exports = UserPageService;