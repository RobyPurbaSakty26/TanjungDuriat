/* eslint-disable no-unused-vars */
"use strict";

const { encryptPassword } = require("../../app/service/userService");
// let pass = "123";
// async function encript(str) {
//   try {
//     pass = await encryptPassword("123");
//   } catch (err) {
//     console.log(err);
//   }
// }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const pass = await encryptPassword("123");
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          Name: "Admin Wahana",
          Email: "AdminKeuangan@mail.com",
          Role: "Admin Keuangan",
          Password: pass,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  },
};
