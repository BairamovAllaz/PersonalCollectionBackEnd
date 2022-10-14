const CollectionService = require("../Services/collectionService");

class CollectionController {

    static async apiCreate(req, res, next) {
        let image = req.file === undefined ? "http://www.engageconsultants.com/wp-content/uploads/2016/06/question-mark.jpg" : req.file.filename;
        const newCollection = {
            name: req.body.name,
            description: req.body.description,
            topic: req.body.topic,
            about : req.body.about,
            userId : req.body.userId,
            image: image
        }
        const collection= await CollectionService.CreateCollectionTable(newCollection);
        const fields = JSON.parse(req.body.field);
        console.log(fields);
        let isCreate = true;
        if(fields.length === 1) {
            fields.forEach(({field_name,field_type}) => {
                if(field_name === "" || field_type === "") {
                    isCreate = false;
                    console.log("not created field table");
                }
            })
        }
        if(isCreate) {
            const response = await CollectionService.CreateItem(fields,collection.Id);
        }
        res.status(200).json(collection.Id);
    }

    static async apiGetAllTopics(req,res,next) {
        const response = await CollectionService.getTopics();
        res.status(200).send(response);
    }

    static async apiGetAllTags(req,res,next) {
        const response = await CollectionService.getTags();
        res.status(200).send(response);
    }

    static async apiGetCollectionFields(req,res,next) {
        const collectionId = req.params.collectionId;
        const response = await CollectionService.GetCollectionFields(collectionId);
        res.status(200).send(response);
    }

    static async apiUpdateCollectionFields(req,res,next) {
        const fields = req.body;
        for (const element of fields) {
            const response = await CollectionService.CreateCollectionFields(element.field_value,element.Id,element.collectionId);
        }
        res.status(200).send("Fields created");
    }

    static async apiGetAllCollectionItems(req,res,next) {
        const {userId,collectionId} = req.params;
        const response = await CollectionService.GetAllCollectionItems(userId,collectionId);
        res.send(response);
    }

}

module.exports = CollectionController;