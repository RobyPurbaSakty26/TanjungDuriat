/* eslint-disable no-unused-vars */
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idWahana: {
        type: Sequelize.INTEGER,
        references: {
          model: "Wahanas",
          key: "id",
        },
      },
      idUser: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      paketId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Pakets",
          key: "id",
        },
      },
      countTiket: {
        type: Sequelize.INTEGER,
      },
      countPrice: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transactions");
  },
};
