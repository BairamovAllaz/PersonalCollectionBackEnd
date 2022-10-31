const CollectionService = require("../Services/collectionService");

class CollectionController {
  static async apiCreate(req, res, next) {
    let image = req.file.path;
    const newCollection = {
      name: req.body.name,
      description: req.body.description,
      topic: req.body.topic,
      about: req.body.about,
      userId: req.body.userId,
      image: image,
    };
    const collection = await CollectionService.CreateCollectionTable(
      newCollection
    );
    const fields = JSON.parse(req.body.field);
    const response = await CollectionService.CreateItem(
        fields,
        collection.Id
    );
    res.status(200).json(collection.Id);
  }

  static async apiGetAllTopics(req, res, next) {
    const response = await CollectionService.getTopics();
    res.status(200).send(response);
  }

  static async apiGetAllTags(req, res, next) {
    const response = await CollectionService.getTags();
    res.status(200).send(response);
  }

  static async apiGetCollectionFields(req, res, next) {
    const collectionId = req.params.collectionId;
    const response = await CollectionService.GetCollectionFields(collectionId);
    res.status(200).send(response);
  }

  static async apiGetAllCollectionItems(req, res, next) {
    const { userId, collectionId } = req.params;
    const response = await CollectionService.GetAllCollectionItems(
      userId,
      collectionId
    );
    res.send(response);
  }

  static async apiCollectionAddLike(req, res, next) {
    const { userId, collectionId } = req.body;
    const response = await CollectionService.CollectionAddLike(
      collectionId,
      userId
    );
    res.send("Like added");
  }

  static async apiCollectionDislike(req, res, next) {
    try {
      const { userId, collectionId } = req.params;
      const response = await CollectionService.CollectionDislike(
        collectionId,
        userId
      );
      res.send("DisLike");
    } catch (err) {
      console.log(err);
    }
  }

  static async apiCollectionDelete(req, res, next) {
    try {
      const { collectionId } = req.params;
      const response = await CollectionService.DeleteCollection(collectionId);
      res.send("Deleted");
    } catch (err) {
      console.log(err);
    }
  }

  static async apiGetCollectionById(req, res, next) {
    try {
      const { collectionId } = req.params;
      const response = await CollectionService.GetCollectionById(collectionId);
      res.send(response);
    } catch (err) {
      console.log(err);
    }
  }

  static async apiUpdateCollection(req, res, next) {
    const id = req.params.collectionId;
    Object.keys(req.body).forEach(function (key) {
      const val = req.body[key];
      CollectionService.UpdateCollection(key, val, id);
    });
    if (req.file !== "" && req.file !== undefined) {
      const re = await CollectionService.UpdateCollection(
        "image",
        req.file.path,
        id
      );
    }
    res.send("Update done");
  }


  static async Test(req,res,next) { 
    const {key} = req.params;
    const response = await CollectionService.test(key);
    res.send(response); 
  }
}

module.exports = CollectionController;
