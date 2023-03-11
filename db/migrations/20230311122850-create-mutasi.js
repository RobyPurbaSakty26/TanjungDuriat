'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mutasis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPemasukan: {
        type: Sequelize.INTEGER
      },
      idPengeluaran: {
        type: Sequelize.INTEGER
      },
      Pengeluaran: {
        type: Sequelize.INTEGER
      },
      Pemasukan: {
        type: Sequelize.INTEGER
      },
      TotalSaldo: {
        type: Sequelize.INTEGER
      },
      Keterangan: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mutasis');
  }
};