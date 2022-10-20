const AdminService = require("../Services/AdminService")
class AdminController{  
    static async apiGetAllUsers(req,res,next) { 
        const users = await AdminService.GetAllUsers();
        res.status(200).send(users); 
    }
}

module.exports = AdminController;