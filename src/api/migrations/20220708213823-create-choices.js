'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('choices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      choice: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Choices');
  }
};