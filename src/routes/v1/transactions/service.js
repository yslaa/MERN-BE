const model = require("./model.js");
const userModel = require("../users/model.js");
const productModel = require("../products/model.js");
const inventoryModel = require("../inventories/model.js");
const {
  extractToken,
  verifyToken,
} = require("../../../middlewares/jwtHelper.js");
const { RESOURCE } = require("../../../constants/index.js");
const { v4: uuidv4 } = require("uuid");
const { ENV } = require("../../../config/environment.js");
const sdk = require("api")("@paymaya/v5.18#1bmd73pl9p4h9zf");

async function getAll() {
  return await model
    .find({ deleted: false })
    .populate("user")
    .populate({
      path: "product",
      populate: {
        path: "id",
        model: RESOURCE.PRODUCTS,
      },
    });
}

async function getAllDeleted() {
  return await model
    .find({ deleted: true })
    .populate("user")
    .populate({
      path: "product",
      populate: {
        path: "id",
        model: RESOURCE.PRODUCTS,
      },
    });
}

async function getById(_id) {
  return await model
    .findOne({ _id, deleted: false })
    .populate("user")
    .populate({
      path: "product",
      populate: {
        path: "id",
        model: RESOURCE.PRODUCTS,
      },
    });
}

async function add(body, session, headers) {
  const products = await Promise.all(
    body.product.map(async (item) => {
      await inventoryModel.findOneAndUpdate(
        { product: item.id },
        { $inc: { quantity: -item.quantity } },
        { session },
      );

      return {
        id: item.id,
        quantity: item.quantity,
      };
    }),
  );

  const productDetails = await Promise.all(
    products.map(async (product) => {
      const details = await productModel.findById(product.id);

      return {
        quantity: product.quantity,
        name: details.name,
        price: details.price,
      };
    }),
  );

  const totalPrice = productDetails.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const token = extractToken(headers.authorization);
  const verifiedToken = verifyToken(token);

  const userDetails = await userModel.findById(verifiedToken.id);

  const transaction = await model.create(
    [
      {
        user: verifiedToken.id,
        product: products,
        totalPrice: totalPrice,
        payment: body.payment,
      },
    ],
    { session },
  );

  sdk.auth(ENV.PAYMAYA_SANDBOX_PUBLIC_KEY, ENV.PAYMAYA_SANDBOX_SECRET_KEY);
  sdk.server(process.env.PAYMAYA_SANDBOX_SERVER);

  const uuid = uuidv4();
  const formattedUuid = uuid
    .replace(/-/g, "")
    .slice(0, 32)
    .replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, "$1-$2-$3-$4-$5");

  if (body.payment === "Maya") {
    const { data } = await sdk.createV1Checkout({
      totalAmount: {
        value: totalPrice,
        currency: ENV.CURRENCY,
      },
      buyer: {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      },
      items: productDetails.map((product) => ({
        name: product.name,
        totalAmount: { value: product.price * product.quantity },
      })),
      requestReferenceNumber: formattedUuid,
    });

    return { transaction, checkoutUrl: data.redirectUrl };
  }

  return transaction;
}

async function update(_id, body, session) {
  return await model.findByIdAndUpdate(_id, body, {
    new: true,
    runValidators: true,
    session,
  });
}

async function deleteById(_id, session) {
  return await model.findByIdAndUpdate(_id, { deleted: true }, { session });
}

async function restoreById(_id, session) {
  return await model.findByIdAndUpdate(_id, { deleted: false }, { session });
}

async function forceDelete(_id, session) {
  return await model.findByIdAndDelete(_id, { session });
}

module.exports = {
  getAll,
  getAllDeleted,
  getById,
  add,
  update,
  deleteById,
  restoreById,
  forceDelete,
};
