const path = require("path");
const { StatusCodes } = require("http-status-codes");
const error = require("../errors/index");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new error.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new error.BadRequestError("Please upload an image");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new error.BadRequestError("Please upload an image smaller than 1KB");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res.status(StatusCodes.OK).json({
    image: { src: `/uploads/${productImage.name}` },
  });
};
const uploadProductImage = async (req, res) => {
  const img = req.files.image;
  console.log(img);
  const newImgPath = await img.mv(req.files.image);
  console.log(newImgPath);
  const result = await cloudinary.uploader.upload(req.files.image, {
    use_filename: true,
    folder: "file-upload",
  });
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.CREATED).json({
    image: {
      src: `${result.secure_url}`,
    },
  });
};

module.exports = {
  uploadProductImage,
};
