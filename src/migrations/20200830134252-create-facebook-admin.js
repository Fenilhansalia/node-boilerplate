'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('facebookAdmin', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT             
      },
      first_name: {
        type: Sequelize.STRING(255)
      },
      last_name: {
        type: Sequelize.STRING(255)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      access_token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      refresh_token: {
        type: Sequelize.STRING
      },
      provider: {
        type: Sequelize.STRING(255)
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
    await queryInterface.dropTable('facebookAdmin');
  }
};