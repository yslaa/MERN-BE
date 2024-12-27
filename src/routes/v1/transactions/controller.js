const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const service = require("../transactions/service.js");
const { STATUSCODE } = require("../../../constants/index.js");
const { responseHandler } = require("../../../utils/responseHandler.js");

const getAllTransaction = asyncHandler(async (req, res) => {
  const data = await service.getAll();

  responseHandler(
    res,
    data,
    data?.length === STATUSCODE.ZERO
      ? "No Transactions found"
      : "All Transactions retrieved successfully",
  );
});

const getAllTransactionDeleted = asyncHandler(async (req, res) => {
  const data = await service.getAllDeleted();

  responseHandler(
    res,
    data,
    data?.length === STATUSCODE.ZERO
      ? "No Deleted Transactions found"
      : "All Deleted Transactions retrieved successfully",
  );
});

const getSingleTransaction = asyncHandler(async (req, res) => {
  const data = await service.getById(req.params.id);

  responseHandler(
    res,
    data,
    !data ? "No Transaction found" : "Transaction retrieved successfully",
  );
});

const createNewTransaction = asyncHandler(async (req, res) => {
  const data = await service.add({ ...req.body }, req.session, req.headers);

  responseHandler(res, [data], "Transaction created successfully");
});

const updateTransaction = asyncHandler(async (req, res) => {
  const data = await service.update(
    req.params.id,
    { ...req.body },
    req.session,
  );

  responseHandler(res, [data], "Transaction updated successfully");
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const data = await service.deleteById(req.params.id, req.session);

  responseHandler(
    res,
    data?.deleted ? [] : [data],
    data?.deleted
      ? "Transaction is already deleted"
      : "Transaction deleted successfully",
  );
});

const restoreTransaction = asyncHandler(async (req, res) => {
  const data = await service.restoreById(req.params.id, req.session);

  responseHandler(
    res,
    !data?.deleted ? [] : [data],
    !data?.deleted
      ? "Transaction is not deleted"
      : "Transaction restored successfully",
  );
});

const forceDeleteTransaction = asyncHandler(async (req, res) => {
  const data = await service.forceDelete(req.params.id, req.session);

  const message = !data
    ? "No Transaction found"
    : "Transaction force deleted successfully";

  responseHandler(res, [data], message);
});

module.exports = {
  getAllTransaction,
  getAllTransactionDeleted,
  getSingleTransaction,
  createNewTransaction,
  updateTransaction,
  deleteTransaction,
  restoreTransaction,
  forceDeleteTransaction,
};
