"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const PROTECTED_ATTRIBUTES = ["password"];
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // toJSON() {
    //   // hide protected fields
    //   let attributes = Object.assign({}, this.get());
    //   for (let a of PROTECTED_ATTRIBUTES) {
    //     delete attributes[a];
    //   }
    //   return attributes;
    // }
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    },
    { timestamps: false }
  );
  return User;
};
