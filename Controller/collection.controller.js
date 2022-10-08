const CollectionService = require("../Services/collectionService");

class CollectionController {

    static async apiCreate(req, res, next) {
        const newCollection = {
            name: req.body.name,
            description: req.body.description,
            topic: req.body.topic,
            image: req.file.filename
        }
        const collection= await CollectionService.apiCreateCollectionTable(newCollection);

        const newField = {
            field_name: req.body.field_name,
            field_value: req.body.field_value,
            field_type: req.body.field_type,
            collectionId : collection.Id,
        }
        const resItem = await CollectionService.apiCreateItem(newField);
        const createdCollection = {...collection,...newField};
        res.status(200).send(createdCollection);
    }

}

module.exports = CollectionController;