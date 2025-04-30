import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { config } from "../../config/index.js";
import { sequelize } from "../../db/index.js";

/**
 * User model module.
 *
 * @module UserModel
 * @author Saurav Pandey
 * @version 1.0.0
 */

// Define the user model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    tableName: "users",
    indexes: [
      {
        fields: ["name"],
      },
      {
        fields: ["deletedAt"],
      },
      {
        fields: ["email"],
        unique: true,
      },
    ],
    // Add hooks within the model definition
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(Number(config?.SALT_WORK_FACTOR));
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(Number(config?.SALT_WORK_FACTOR));
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
    defaultScope: {
      where: {
        deletedAt: null,
      },
    },
  }
);

// Instance method to compare password
User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export the user model
export default User;
