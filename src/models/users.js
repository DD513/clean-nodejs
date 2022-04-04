export default (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      images: {
        type: DataTypes.TEXT,
      },
      verificationCode: {
        type: DataTypes.STRING,
      },
      inputTimes: {
        type: DataTypes.INTEGER,
      },
      email_verified: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "users",
      timestamps: true,
      freezeTableName: true,
    }
  );
  return users;
};
