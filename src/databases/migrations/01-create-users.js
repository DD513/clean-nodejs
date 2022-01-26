export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("users", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    images: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    verificationCode: {
      type: Sequelize.STRING(6),
      allowNull: true,
    },
    inputTimes: {
      type: Sequelize.INTEGER,
    },
    email_verified: {
      type: Sequelize.DATE,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable("users");
}
