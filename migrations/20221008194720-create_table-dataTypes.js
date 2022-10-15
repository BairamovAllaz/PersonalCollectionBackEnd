'use strict';

const {DataTypes, Sequelize} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("datatypes",{
      Id: {
        type: DataTypes.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
      },
      type_name : {
        type : DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("datatypes");
  }
};
