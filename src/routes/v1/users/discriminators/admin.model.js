const { Schema } = require("mongoose");
const users = require("../model.js");
const { RESOURCE, ROLE } = require("../../../../constants/index.js");

const schemaOptions = {
  discriminatorKey: RESOURCE.ROLE,
};

const adminSchema = new Schema({}, schemaOptions);

const AdminDiscriminator =
  users?.discriminators?.[ROLE.ADMIN] ||
  users.discriminator(ROLE.ADMIN, adminSchema);

module.exports = { AdminDiscriminator };
