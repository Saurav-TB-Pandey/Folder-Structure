import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { config } from "../../config/index.js";

/**
 * User model module.
 *
 * @module UserModel
 * @author Saurav Pandey
 * @version 1.0.0
 */

// Define the user schema
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      select: false,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    userName: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    userIcon: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    accessToken: {
      type: String,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      default: "user",
      select: false,
    },
    deletedAt: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
userSchema.index({ userName: 1 });
userSchema.index({ email: 1 });
userSchema.index({ fullName: 1 });
userSchema.index({ refreshToken: 1 });

// Pre-save hook to hash passwords
userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("firstName") || user.isModified("lastName")) {
    user.fullName = `${user.firstName}${user.lastName}`;
  }

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(Number(config?.SALT_WORK_FACTOR), function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Export the user model
const Users = model("Users", userSchema);
export default Users;
