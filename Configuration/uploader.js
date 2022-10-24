const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "djflmajs1",
  api_key: "978923371165168",
  api_secret: "82tjkZFgczsUSNJ_QkEQlqXYibM",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "PersonalCollection",
  },
});
var upload = multer({
  storage: storage,
});
module.exports = upload;
