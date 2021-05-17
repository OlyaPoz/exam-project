'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {
    static associate (models) {
      Contest.belongsTo(models.User, {
        foreignKey: 'userId',
        sourceKey: 'id',
      });

      Contest.hasMany(models.Offer, {
        foreignKey: 'contestId',
        targetKey: 'id',
      });
    }
  }
  Contest.init(
    {
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      contestType: {
        type: DataTypes.ENUM('name', 'tagline', 'logo'),
        allowNull: false,
      },
      fileName: {
        type: DataTypes.STRING,
      },
      originalFileName: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      typeOfName: {
        type: DataTypes.STRING,
      },
      industry: {
        type: DataTypes.STRING,
      },
      focusOfWork: {
        type: DataTypes.TEXT,
      },
      targetCustomer: {
        type: DataTypes.TEXT,
      },
      styleName: {
        type: DataTypes.STRING,
      },
      nameVenture: {
        type: DataTypes.STRING,
      },
      typeOfTagline: {
        type: DataTypes.STRING,
      },
      brandStyle: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('active', 'finished', 'pending'),
        allowNull: false,
      },
      prize: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Contest',
    }
  );
  return Contest;
};
