const mongoose = require("mongoose");
const { RESOURCE } = require("../../../constants/index.js");

const schemaOptions = {
  timestamps: true,
};

const schema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: RESOURCE.PRODUCTS,
    },
    quantity: {
      type: Number,
      required: true,
    },
    warehouseLocation: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  schemaOptions,
);

const Inventory =
  mongoose.models[RESOURCE.INVENTORIES] ||
  mongoose.model(RESOURCE.INVENTORIES, schema);

module.exports = Inventory;
