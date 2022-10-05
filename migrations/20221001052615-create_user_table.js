'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("users",{
      Id: {
        type: Sequelize.INTEGER,
        allowNull : false,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false
      },
      image : {
        type: Sequelize.STRING,
        allowNull : true
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
    return queryInterface.dropTable("users");
  }
};
