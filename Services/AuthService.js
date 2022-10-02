const database = require("../Models/UserModel");
const User = require("../Models/UserModel");

module.exports = class AuthService{
    static async CreateUser(data) {
        try {
            const newuser = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password : data.password,
                image : data.image,
                updatedAt: data.updatedAt,
                createdAt: data.createdAt
            }
            const response = await database.create(newuser);
            return response;
        }catch(err) {
            console.log(err);
        }
    }
    
    static async findUserByEmail(email) { 
        try{ 
            if(email == null) {
                throw new Error("Email cant be null");
            }
            const response = await User.findOne({
                where : {
                    email : email
                }
            })
            return response;
        }catch(err) {
            console.log(err);
        }
    }

    static async findUserById(Id) {
        try{
            if(Id == null) {
                throw new Error("Id cant be null");
            }
            const response = await User.findOne({
                where : {
                    id : Id
                }
            })
            return response;
        }catch(err) {
            console.log(err);
        }
    }




}

