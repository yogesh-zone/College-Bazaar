const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter your name!"],
      trime: true,
      minlength: [2, "Name must be at least 2 character"],
      maxlength: [15, "Name cannot exceed 15 characters"],
    },

    email: {
      type: String,
      require: [true, "Please enter your email!"],
      trim: true,
      unique: [true, "Email already registerd!"],
    },

    password: {
      type: String,
      require: [true, "Please enter your password!"],
      select: false,
    },

    role: {
      type: Number,
      default: 0, // 0 => user ,  1 => admin
      select: false,
    },

    avatar: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dbej3vdgp/image/upload/v1664800251/College%20Bazaar/userIcon_l7k486.png",
      },
      public_id: {
        type: String,
        default: undefined,
      },
    },
    phone: {
      type: String,
      default: undefined,
    },

    resetPasswordToken: {
      type: String,
      default: undefined,
    },
    resetPasswordExpire: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

//compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
