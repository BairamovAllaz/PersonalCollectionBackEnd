const CollectionService = require("../Services/collectionService");

class CollectionController {

    static async apiCreate(req, res, next) {
        const newCollection = {
            name: req.body.name,
            description: req.body.description,
            topic: req.body.topic,
            userId : 1,
            image: req.file.filename
        }
        const collection= await CollectionService.apiCreateCollectionTable(newCollection);
        const fields = JSON.parse(req.body.field);
        const response = await CollectionService.apiCreateItem(fields,collection.Id);
        res.status(200).send(response);
    }
    static async testApi(req,res,next) {
        const ress = CollectionService.getReq();
        res.send(ress);
    }

}

module.exports = CollectionController;