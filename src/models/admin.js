'use strict';
module.exports = (sequelize, DataTypes) => {
    let Admin = sequelize.define('admin', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
        status: DataTypes.INTEGER,
    }, {
        tableName: "admin",
        timestamps: true,
    });
    return Admin;
};