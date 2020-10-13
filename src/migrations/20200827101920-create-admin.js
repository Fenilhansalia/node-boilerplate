const uuid = require('uuid')
'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admin', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING(255)
      },
      last_name: {
        type: Sequelize.STRING(255)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      password: {
        type: Sequelize.STRING
      },
      image: {
        allowNull: true,
        defaultValue: "default.png",
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.SMALLINT,
        validate: {
          isIn: [0, 1]
        },
        defaultValue: 0,
        comment: '1-ACTIVE, 0-INACTIVE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin');
  }
};