const mongoose = require("mongoose");
const { RESOURCE } = require("../../../constants/index.js");

const schemaOptions = {
  discriminatorKey: RESOURCE.ROLE,
  timestamps: true,
};

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6,
    },
    image: [
      {
        public_id: String,
        url: String,
        originalname: String,
      },
    ],
    verificationCode: {
      code: {
        type: String,
        default: null,
      },
      createdAt: {
        type: Date,
        default: null,
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  schemaOptions,
);

const User =
  mongoose.models[RESOURCE.USERS] || mongoose.model(RESOURCE.USERS, schema);

module.exports = User;
