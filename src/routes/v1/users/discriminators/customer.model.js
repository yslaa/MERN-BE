const { Schema } = require("mongoose");
const users = require("../model.js");
const { RESOURCE, ROLE } = require("../../../../constants/index.js");

const schemaOptions = {
  discriminatorKey: RESOURCE.ROLE,
};

const customerSchema = new Schema({}, schemaOptions);

const CustomerDiscriminator =
  users?.discriminators?.[ROLE.CUSTOMER] ||
  users.discriminator(ROLE.CUSTOMER, customerSchema);

module.exports = { CustomerDiscriminator };
