const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { cloudinary } = require("../config/cloudinary.js");
const { RESOURCE } = require("../constants/index.js");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: RESOURCE.CLOUDINARY_FOLDER,
      public_id: `${file.originalname.replace(/\.[^/.]+$/, "")}-${uuidv4()}`,
    };
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
