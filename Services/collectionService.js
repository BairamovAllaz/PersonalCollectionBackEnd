const CollectionTable = require("../Models/Collection");
const ItemsTable = require("../Models/Item");
const Fields = require("../Models/Fields");
const Tags = require("../Models/Tags");

class CollectionService {
    static async apiCreateCollectionTable(collection) {
        try {
            const newCollection = {
                name: collection.name,
                description: collection.description,
                topic: collection.topic,
                image: collection.image,
                createdAt : new Date(),
                updatedAt : new Date()
            }
            const response = await CollectionTable.create(newCollection);
            return response;
        } catch(err) {
            console.log(err);
        }
    }

    static async apiCreateItem(fields,id) {
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


}

module.exports = CollectionService;