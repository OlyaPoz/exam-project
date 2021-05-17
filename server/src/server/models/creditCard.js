'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CreditCard extends Model {
    static associate (models) {}
  }
  CreditCard.init(
    {
      cardNumber: {
        type: DataTypes.STRING(16),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiry: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      cvc: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: 'CreditCard',
      timestamps: false,
    }
  );
  return CreditCard;
};
