'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('Contests', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        orderId: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        contestType: {
          type: Sequelize.ENUM('name', 'tagline', 'logo'),
          allowNull: false,
        },
        fileName: {
          type: Sequelize.STRING,
        },
        originalFileName: {
          type: Sequelize.STRING,
        },
        title: {
          type: Sequelize.STRING,
        },
        typeOfName: {
          type: Sequelize.STRING,
        },
        industry: {
          type: Sequelize.STRING,
        },
        focusOfWork: {
          type: Sequelize.TEXT,
        },
        targetCustomer: {
          type: Sequelize.TEXT,
        },
        styleName: {
          type: Sequelize.STRING,
        },
        nameVenture: {
          type: Sequelize.STRING,
        },
        typeOfTagline: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.ENUM('active', 'finished', 'pending'),
          allowNull: false,
        },
        brandStyle: {
          type: Sequelize.STRING,
        },
        prize: {
          allowNull: false,
          type: Sequelize.DECIMAL,
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        priority: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        updatedAt: {
          type: Sequelize.STRING,
          defaultValue: new Date(),
        },
        createdAt: {
          type: Sequelize.STRING,
          defaultValue: new Date(),
        },
      })
      .then(() =>
        queryInterface.addConstraint('Contests', {
          type: 'check',
          fields: ['prize'],
          where: {
            prize: {
              [Sequelize.Op.gte]: 0,
            },
          },
        })
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contests');
  },
};
