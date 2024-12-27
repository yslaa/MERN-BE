const mongoose = require("mongoose");
const { RESOURCE, STATUS } = require("../../../constants/index.js");

const schemaOptions = {
  timestamps: true,
};

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: RESOURCE.USERS,
    },
    product: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: RESOURCE.PRODUCTS,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
      enum: [RESOURCE.MAYA, RESOURCE.CASH],
    },
    status: {
      type: String,
      required: false,
      default: STATUS.PENDING,
      enum: [STATUS.PENDING, STATUS.COMPLETED, STATUS.FAILED],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  schemaOptions,
);

const Transaction =
  mongoose.models[RESOURCE.TRANSACTIONS] ||
  mongoose.model(RESOURCE.TRANSACTIONS, schema);

module.exports = Transaction;
