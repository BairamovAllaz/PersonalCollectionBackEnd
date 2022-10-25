const CollectionTable = require("../Models/Collection");
const ItemsTable = require("../Models/Item");
const Fields = require("../Models/Fields");
const Tags = require("../Models/Tags");
const Topics = require("../Models/Topics");
const User = require("../Models/UserModel");
const Collection = require("../Models/Collection");
const Item = require("../Models/Item");
const CollectionLikes = require("../Models/collectionLikes");
const { Sequelize } = require("sequelize");

class CollectionService {
  static async CreateCollectionTable(collection) {
    try {
      const newCollection = {
        name: collection.name,
        description: collection.description,
        topic: collection.topic,
        about: collection.about,
        image: collection.image,
        userId: collection.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const response = await CollectionTable.create(newCollection);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async CreateItem(fields, id) {
    try {
      fields.forEach(element => {
        const newField = {
          field_name: element.field_name,
          field_value: "",
          field_type: element.field_type,
          collectionId: id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        Fields.create(newField);
      });
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  static async GetCollectionById(collectionId) {
    try {
      const response = await Collection.findAll({
        where: {
          Id: collectionId,
        },
        include: [
          {
            model: Item,
            required : false,
            where : { 
              isDelete : false
            }
          },
        ],
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async getReq() {
    const res = await CollectionTable.findAll({
      include: [
        {
          model: Fields,
          required: true,
        },
      ],
    });
    console.log(res);
    return res;
  }

  static async getTopics() {
    try {
      const response = await Topics.findAll();
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async getTags() {
    try {
      const response = await Tags.findAll();
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async GetCollectionFields(id) {
    try {
      const response = await Fields.findAll({
        where: {
          collectionId: id,
        },
      });
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async CreateCollectionFields(value, id, collectionId) {
    try {
      const response = await Fields.update(
        { field_value: value },
        {
          where: {
            Id: id,
            collectionId,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async CollectionAddLike(collectionId, userId) {
    try {
      const like = {
        collectionId,
        userId,
      };
      const res = await CollectionLikes.create(like);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  static async CollectionDislike(collectionId, userId) {
    try {
      const res = CollectionLikes.destroy({
        where: {
          collectionId,
          userId,
        },
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  static async DeleteCollection(collectionId) {
    try {
      const res = Collection.update(
        { isDelete: true },
        {
          where: {
            Id: collectionId,
          },
        }
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  static async UpdateCollection(keyf, field, collectionId) {
    try {
      const response = await Collection.update(
        { [keyf]: field },
        {
          where: {
            id: collectionId,
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = CollectionService;