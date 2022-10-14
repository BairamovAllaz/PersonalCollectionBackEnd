const CollectionTable = require("../Models/Collection");
const ItemsTable = require("../Models/Item");
const Fields = require("../Models/Fields");
const Tags = require("../Models/Tags");
const Topics = require("../Models/Topics");
const User = require("../Models/UserModel");
const Collection = require("../Models/Collection");
const Item = require("../Models/Item");

class CollectionService {
    static async CreateCollectionTable(collection) {
        try {
            const newCollection = {
                name: collection.name,
                description: collection.description,
                topic: collection.topic,
                about : collection.about,
                image: collection.image,
                userId : collection.userId,
                createdAt : new Date(),
                updatedAt : new Date()
            }
            const response = await CollectionTable.create(newCollection);
            return response;
        } catch(err) {
            console.log(err);
        }
    }

    static async CreateItem(fields, id) {
        try {
            fields.forEach(element => {
                const newField = {
                    field_name: element.field_name,
                    field_value: "test",
                    field_type: element.field_type,
                    collectionId : id,
                    createdAt : new Date(),
                    updatedAt : new Date()
                }
                Fields.create(newField);
            })
            return true;
        } catch(err) {
            console.log(err);
        }
    }

    static async getReq(){
        const res = await CollectionTable.findAll({
            include: [{
                model: Fields,
                required: true
            }]
        });
        console.log(res);
        return res;
    }

    static async getTopics() {
        try{
            const response = await Topics.findAll();
            return response;
        }catch(err) {
            console.log(err);
        }
    }


    static async getTags() {
        try{
            const response = await Tags.findAll();
            return response;
        }catch(err) {
            console.log(err);
        }
    }

    static async GetCollectionFields(id) {
        try {
            const response = await Fields.findAll({
                where : {
                    collectionId : id
                }
            })
            return response;
        }catch(err) {
            console.log(err);
        }
    }


    static async CreateCollectionFields(value,id,collectionId) {
        try {
                const response = await Fields.update(
                {"field_value" : value},
                {where: {
                    Id : id, collectionId,
                }}
            )
            return response;
        }catch(err) {
            console.log(err);
        }
    }

    static async GetAllCollectionItems(userId,collectionId) {
        try {
            const response = await User.findAll({
                where : {
                    Id : userId
                },
                include : [{
                    model : Collection,
                    where : {
                        Id : collectionId
                    },
                    include : [{
                        model : Item
                    }]
                }]
            })
            return response;
        }catch(err) {
            console.log(err);
        }
    }


}

module.exports = CollectionService;