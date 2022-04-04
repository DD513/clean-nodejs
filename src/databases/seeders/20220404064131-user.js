"use strict";
import PasswordService from "../../services/password";
import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        name: "John Doe",
        email: "JohnDoe@gmail.com",
        password: PasswordService.hashPassword("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "QQ",
        email: "qq@gmail.com",
        password: PasswordService.hashPassword("1111"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "DD513",
        email: "dd@gmail.com",
        password: PasswordService.hashPassword("1111"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "admin",
        email: "admin@gmail.com",
        password: PasswordService.hashPassword("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Annie",
        email: "annie@gmail.com",
        password: PasswordService.hashPassword("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "teng",
        email: "teng@gmail.com",
        password: PasswordService.hashPassword("1111"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "demo",
        email: "demo@gmail.com",
        password: PasswordService.hashPassword("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "eric.lin",
        email: "eric@gmail.com",
        password: PasswordService.hashPassword("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("users", null);
  },
};
