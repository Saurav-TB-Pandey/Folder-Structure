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
        name: {
            type: String,
            required: true,
            trim: true,
        },
        userName: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: (props) =>
                    `${props.value} is not a valid email address!`,
            },
        },
        userIcon: {
            type: String,
            default: "defaultUserIcon.png", // Assuming you have a default user icon
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        authToken: {
            type: String,
            select: false,
        },
        refreshToken: {
            type: String,
            select: false,
        },
        deletedAt: {
            type: Date,
            default: null,
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

// Pre-save hook to hash passwords
userSchema.pre("save", function (next) {
    const user = this;
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

// Optional: Method to safely return public profile data
userSchema.methods.getPublicProfile = function () {
    const { name, userName, email, userIcon } = this;
    return { name, userName, email, userIcon };
};

// Export the user model
const Users = model("Users", userSchema);
export default Users;
