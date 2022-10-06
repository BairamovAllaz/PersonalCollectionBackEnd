const database = require("../Models/UserModel");
const Token = require("../Models/ForgotToken")

class AuthService{

    static async CreateUser(data) {
        try {
            const newuser = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password : data.password,
                image : data.image,
                userRole : data.userRole,
                authType : data.authType,
                updatedAt: data.updatedAt,
                createdAt: data.createdAt
            }
            const response = await database.create(newuser);
            return response;
        }catch(err) {
            console.log(err);
        }
    }

    static async CreateIfDontExsist(data) {
        try{
            const newuser = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password : data.password,
                image : data.image,
                authType : data.authType,
                userRole : data.userRole,
                updatedAt: data.updatedAt,
                createdAt: data.createdAt
            }
            const isExsist = await AuthService.findUserByEmail(newuser.email);
            if(isExsist === null) {
                const createdUser = await AuthService.CreateUser(newuser);
            }
            return newuser;

        }catch(err) {
            console.log(err);
        }

    }
    
    static async findUserByEmail(email) { 
        try{ 
            if(email == null) {
                throw new Error("Email cant be null");
            }
            const response = await database.findOne({
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
            const response = await database.findOne({
                where : {
                    id : Id
                }
            })
            return response;
        }catch(err) {
            console.log(err);
        }
    }

    static async CreateToken(id,data) {
        try {
            const newtoken = {
                userId : id,
                token: data
            }
            const response = await Token.create(newtoken);
            return response;
        }catch(err) {
            console.log(err);
        }
    }

    static async GetTokenByToken(token) {
        try {
            const response = await Token.findOne({
                where:{
                    token : token
                }
            });
            return response;
        }catch(err) {
            console.log(err);
        }
    }

    static async UpdateUserPassword(Id,newPassword) {
        try {
            const response = await database.update(
                {password: newPassword},
                {where : {
                    id: Id
                }}
            )
            return response;
        }catch(err) {
            console.log(err);
        }
    }


    static async DeleteToken(token) {
        try {
            const response = await Token.destroy({
                where : {
                    token : token
                }
            })
            return response;
        }catch(err) {
            console.log(err);
        }
    }

}
module.exports = AuthService;
