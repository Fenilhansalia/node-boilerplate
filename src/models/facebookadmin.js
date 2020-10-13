"use strict";
module.exports = (sequelize, DataTypes) => {
  let facebookAdmin = sequelize.define(
    "facebookAdmin",
    {
      user_id: DataTypes.INTEGER,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      access_token: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      provider: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      tableName: "facebookAdmin",
      timestamps: true,
    }
  );
  return facebookAdmin;
};
