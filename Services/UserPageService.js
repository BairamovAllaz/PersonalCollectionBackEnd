const CollectionDatabase = require("../Models/Collection");
const User = require("../Models/UserModel");
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


    static async UpdateUserFields(keyf,field,id) {
        try{
            const response = await User.update(
                {keyf : field},
                {where: {
                    id : id
                }}
            )
            return response;
        }catch(err) {
            console.log(err);
        }
    }

}
module.exports = UserPageService;