'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Choices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Questions}) {
      // define association here
      this.belongsTo(Questions, { foreignKey: 'questionId', as: 'questions'})
    }
  }
  Choices.init({
    choice: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'choice text must have content' },
        notEmpty: { msg: 'choice text must not be empty' },
      }
    },
    correct:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'correct must have content' },
        notEmpty: { msg: 'correct  must not be empty' },
      }
    } 
  }, {
    sequelize,
    tableName: 'choices',
    modelName: 'Choices',
  });
  return Choices;
};