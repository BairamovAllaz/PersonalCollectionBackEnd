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
                image: collection.image
            }
            const response = await CollectionTable.create(newCollection);
            return response;
        } catch(err) {
            console.log(err);
        }
    }

    static async apiCreateItem(Field) {
        try {
            const newField = {
                field_name: Field.field_name,
                field_value: Field.field_value,
                field_type: Field.field_type,
                collectionId : Field.collectionId,
            }

            const response = await Fields.create(newField);
            return response;
        } catch(err) {
            console.log(err);
        }
    }


}

module.exports = CollectionService;