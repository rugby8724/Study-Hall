'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Choices }) {
      // define association here
      this.hasMany(Choices, { foreignKey: 'questionId', as: 'choices'})
    }
  }
  Questions.init({
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Question text must have content' },
        notEmpty: { msg: 'Question text must not be empty' },
      }
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'topic must have content' },
        notEmpty: { msg: 'topic must not be empty' },
      }
    },
    section: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'section must have content' },
        notEmpty: { msg: 'section must not be empty' },
      }
    }
  }, {
    sequelize,
    tableName: 'questions',
    modelName: 'Questions',
  });
  return Questions;
};