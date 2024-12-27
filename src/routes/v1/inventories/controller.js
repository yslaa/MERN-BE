const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const service = require("../inventories/service.js");
const productService = require("../products/service.js");
const { STATUSCODE } = require("../../../constants/index.js");
const { responseHandler } = require("../../../utils/responseHandler.js");

const getAllInventory = asyncHandler(async (req, res) => {
  const data = await service.getAll();

  responseHandler(
    res,
    data,
    data?.length === STATUSCODE.ZERO
      ? "No Inventories found"
      : "All Inventories retrieved successfully",
  );
});

const getAllInventoryDeleted = asyncHandler(async (req, res) => {
  const data = await service.getAllDeleted();

  responseHandler(
    res,
    data,
    data?.length === STATUSCODE.ZERO
      ? "No Deleted Inventories found"
      : "All Deleted Inventories retrieved successfully",
  );
});

const getSingleInventory = asyncHandler(async (req, res) => {
  const data = await service.getById(req.params.id);

  responseHandler(
    res,
    data,
    !data ? "No Inventory found" : "Inventory retrieved successfully",
  );
});

const createNewInventory = asyncHandler(async (req, res) => {
  const existingProduct = await productService.getById(req.body.product);

  if (!existingProduct)
    throw createError(
      STATUSCODE.NOT_FOUND,
      "Product does not exist or has been deleted",
    );

  const existingInventory = await service.getByProductId(req.body.product);

  if (existingInventory)
    throw createError(
      STATUSCODE.BAD_REQUEST,
      "Inventory for this product already exists",
    );

  const data = await service.add({ ...req.body }, req.session);

  responseHandler(res, [data], "Inventory created successfully");
});

const updateInventory = asyncHandler(async (req, res) => {
  const data = await service.update(
    req.params.id,
    { ...req.body },
    req.session,
  );

  responseHandler(res, [data], "Inventory updated successfully");
});

const deleteInventory = asyncHandler(async (req, res) => {
  const data = await service.deleteById(req.params.id, req.session);

  responseHandler(
    res,
    data?.deleted ? [] : [data],
    data?.deleted
      ? "Inventory is already deleted"
      : "Inventory deleted successfully",
  );
});

const restoreInventory = asyncHandler(async (req, res) => {
  const data = await service.restoreById(req.params.id, req.session);

  responseHandler(
    res,
    !data?.deleted ? [] : [data],
    !data?.deleted
      ? "Inventory is not deleted"
      : "Inventory restored successfully",
  );
});

const forceDeleteInventory = asyncHandler(async (req, res) => {
  const data = await service.forceDelete(req.params.id, req.session);

  const message = !data
    ? "No Inventory found"
    : "Inventory force deleted successfully";

  responseHandler(res, [data], message);
});

module.exports = {
  getAllInventory,
  getAllInventoryDeleted,
  getSingleInventory,
  createNewInventory,
  updateInventory,
  deleteInventory,
  restoreInventory,
  forceDeleteInventory,
};
