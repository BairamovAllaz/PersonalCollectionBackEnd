'use strict';

const {DataTypes, Sequelize} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("users",{
      Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull : false
      },
      image : {
        type: DataTypes.STRING,
        allowNull : true
      },
      userRole : {
          type: DataTypes.BOOLEAN,
          default : false,
          allowNull : false
      },
      authType : {
        type : DataTypes.STRING,
        allowNull : false
      },
      isDelete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    });
    await queryInterface.createTable("collections",{
      Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
      },
      name : {
        type : DataTypes.STRING,
        allowNull: false
      },
      description : {
        type : DataTypes.TEXT,
        allowNull : false
      },
      about : {
        type : DataTypes.STRING,
        allowNull : false,
      },
      topic : {
        type : DataTypes.STRING,
        allowNull : false
      },
      userId : {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'Id',
        }
      },
      isDelete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
      },
      image : {
        type : DataTypes.STRING,
        allowNull : false
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    });

    await queryInterface.createTable("items",{
      Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
      },
      item_name: {
        type : DataTypes.STRING,
        allowNull: false
      },
      collectionId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'collections',
          key: 'Id',
        },
      },
      image : {
        type : DataTypes.STRING,
        allowNull: false
      },
      isDelete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    });


    await queryInterface.createTable("itemTags",{
      Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
      },
      tag_name : {
        type : DataTypes.STRING,
        allowNull: false
      },
      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'items',
          key: 'Id',
        },
      },
      isDelete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    });

    await queryInterface.createTable("tags",{
      Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
      },
      name : {
        type : DataTypes.STRING,
        allowNull: false
      },
      isDelete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    });


    await queryInterface.createTable("fields",{
      Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
      },
      field_name : {
        type : DataTypes.STRING,
        allowNull: false
      },
      field_value: {
        type: DataTypes.STRING,
        allowNull : false
      },
      field_type : {
        type : DataTypes.STRING,
        allowNull : null
      },
      isDelete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
      },
      collectionId : {
        type: DataTypes.INTEGER,
        references: {
          model: 'collections',
          key: 'Id',
        }
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    });


    await queryInterface.createTable("itemFields", {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      field_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field_value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field_type: {
        type: DataTypes.STRING,
        allowNull: null,
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "items",
          key: "Id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("collections");
    await queryInterface.dropTable("items");
    await queryInterface.dropTable("tags");
    await queryInterface.dropTable("fields");
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("itemFields");
  }
};
