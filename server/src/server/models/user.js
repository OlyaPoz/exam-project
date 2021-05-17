'use strict';
const { Model } = require('sequelize');
const bcryptjs = require('bcryptjs');
const { SALT_ROUNDS } = require('../../constants');

async function hashPassword (user, options) {
  if (user.changed('password')) {
    const { password } = user;
    const hash = await bcryptjs.hash(password, SALT_ROUNDS);
    user.password = hash;
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Offer, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(models.Contest, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(models.Rating, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(models.RefreshToken, {
        foreignKey: 'userId',
      });
    }

    async comparePassword (plainPassword) {
      return bcryptjs.compare(plainPassword, this.getDataValue('password'));
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        field: 'passwordHash',
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM('customer', 'creator'),
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
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.addHook('beforeCreate', hashPassword);
  User.addHook('beforeUpdate', hashPassword);

  return User;
};
