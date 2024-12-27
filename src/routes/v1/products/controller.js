const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const service = require("../products/service.js");
const { STATUSCODE } = require("../../../constants/index.js");
const { multipleImages } = require("../../../utils/multipleImages.js");
const { upload } = require("../../../utils/multer.js");
const { responseHandler } = require("../../../utils/responseHandler.js");

const getAllProduct = asyncHandler(async (req, res) => {
  const data = await service.getAll();

  responseHandler(
    res,
    data,
    data?.length === STATUSCODE.ZERO
      ? "No Products found"
      : "All Products retrieved successfully",
  );
});

const getAllProductDeleted = asyncHandler(async (req, res) => {
  const data = await service.getAllDeleted();

  responseHandler(
    res,
    data,
    data?.length === STATUSCODE.ZERO
      ? "No Deleted Products found"
      : "All Deleted Products retrieved successfully",
  );
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const data = await service.getById(req.params.id);

  responseHandler(
    res,
    data,
    !data ? "No Product found" : "Product retrieved successfully",
  );
});

const createNewProduct = [
  upload.array("image"),
  asyncHandler(async (req, res) => {
    const uploadedImages = await multipleImages(req.files, []);

    if (uploadedImages.length === STATUSCODE.ZERO)
      throw createError(STATUSCODE.BAD_REQUEST, "Image is required");

    const data = await service.add(
      {
        ...req.body,
        image: uploadedImages,
      },
      req.session,
    );

    responseHandler(res, [data], "Product created successfully");
  }),
];

const updateProduct = [
  upload.array("image"),
  asyncHandler(async (req, res) => {
    const oldData = await service.getById(req.params.id, req.session);

    const uploadedImages =
      req.files.length > 0
        ? await multipleImages(
            req.files,
            oldData?.image.map((image) => image.public_id) || [],
          )
        : oldData.image;

    const data = await service.update(
      req.params.id,
      {
        ...req.body,
        image: uploadedImages,
      },
      req.session,
    );

    responseHandler(res, [data], "Product updated successfully");
  }),
];

const deleteProduct = asyncHandler(async (req, res) => {
  const data = await service.deleteById(req.params.id, req.session);

  responseHandler(
    res,
    data?.deleted ? [] : [data],
    data?.deleted
      ? "Product is already deleted"
      : "Product deleted successfully",
  );
});

const restoreProduct = asyncHandler(async (req, res) => {
  const data = await service.restoreById(req.params.id, req.session);

  responseHandler(
    res,
    !data?.deleted ? [] : [data],
    !data?.deleted ? "Product is not deleted" : "Product restored successfully",
  );
});

const forceDeleteProduct = asyncHandler(async (req, res) => {
  const data = await service.forceDelete(req.params.id, req.session);

  const message = !data
    ? "No Product found"
    : "Product force deleted successfully";

  await multipleImages(
    [],
    data?.image ? data.image.map((image) => image.public_id) : [],
  );

  responseHandler(res, [data], message);
});

module.exports = {
  getAllProduct,
  getAllProductDeleted,
  getSingleProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  forceDeleteProduct,
};
