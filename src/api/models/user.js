'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'username must have content' },
        notEmpty: { msg: 'username must not be empty' },
      }
    }, 
    password:{
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'username must have content' },
        notEmpty: { msg: 'username must not be empty' },
      }
    } 
  }, {
    sequelize,
    tableName: 'user',
    modelName: 'User',
  });
  return User;
};