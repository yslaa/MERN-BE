const mongoose = require("mongoose");
const { STATUSCODE, RESOURCE } = require("../constants/index.js");

async function transaction(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();

  req.session = session;

  res.on(RESOURCE.FINISH, async () => {
    res.statusCode >= STATUSCODE.OK && res.statusCode < STATUSCODE.BAD_REQUEST
      ? await session.commitTransaction()
      : await session.abortTransaction();

    session.endSession();
  });

  next();
}

module.exports = { transaction };
