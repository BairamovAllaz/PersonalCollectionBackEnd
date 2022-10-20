const User = require("../Models/UserModel");
class AdminService {

    static async GetAllUsers() {
        try {
            const response = await User.findAll({});
            return response;
        }catch(err) { 
            console.log(err)
        }
    }
}
module.exports = AdminService;
