const mongoose = require("mongoose");
const badWords = require("bad-words");
const { RESOURCE } = require("../../../constants/index.js");
const { customBadWords } = require("../../../utils/customBadWords.js");

const filter = new badWords();
filter.addWords(...customBadWords);

const schemaOptions = {
  timestamps: true,
};

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return !filter.isProfane(value);
        },
        description: "Description contains inappropriate language.",
      },
    },
    price: {
      type: Number,
      required: true,
    },
    image: [
      {
        public_id: String,
        url: String,
        originalname: String,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  schemaOptions,
);

const Product =
  mongoose.models[RESOURCE.PRODUCTS] ||
  mongoose.model(RESOURCE.PRODUCTS, schema);

module.exports = Product;
