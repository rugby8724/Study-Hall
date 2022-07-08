'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: false
        
      },
      section: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('Questions');
  }
};