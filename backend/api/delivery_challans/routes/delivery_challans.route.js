const express = require("express");
const router = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const uploadImage = async (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/delivery_challans");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5, // 5 MB
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        return cb(
          new Error(
            "Only files with the following extensions are allowed: png,jpg,jpeg "
          )
        );
      }
    },
  });

  const uploadSingleImage = upload.single("signatureImage");
  uploadSingleImage(req, res, function (err) {
    if (err) {
      data = {
        message: err.message,
      };
      return response.validation_error_message(data, res);
    }
    next();
  });
};

// Define middleware to resize the uploaded image using sharp
const resizeImage = async (req, res, next) => {
  if (req.file) {
    try {
      const imagePath = req.file.path;
      const resizedPath = imagePath.replace(
        path.extname(imagePath),
        "-resized" + path.extname(imagePath)
      );
      await sharp(imagePath).resize(40).toFile(resizedPath);
      fs.unlinkSync(imagePath);
      fs.renameSync(resizedPath, imagePath);
    } catch (error) {
      console.log(error);
    }
  }
  next();
};

const delivery_ChallansController = require("../controllers/delivery_challans.controller");
const delivery_ChallansValidator = require("../validations/delivery_challans.validator");
const checkAccess = require("../../../middleware/permission.middleware");

router.post(
  "/addDeliverychallan",
  checkAccess.checkAccess("deliveryChallan", "create"),
  uploadImage,
  resizeImage,
  delivery_ChallansValidator.create,
  delivery_ChallansController.create
);
router.get(
  "/listDeliverychallans",
  checkAccess.checkAccess("deliveryChallan", "view"),
  delivery_ChallansController.list
);
router.put(
  "/updateDeliverychallan/:id",
  checkAccess.checkAccess("deliveryChallan", "update"),
  uploadImage,
  resizeImage,
  delivery_ChallansController.update
);
router.get(
  "/viewDeliverychallan/:id",
  checkAccess.checkAccess("deliveryChallan", "view"),
  delivery_ChallansController.view
);
router.post(
  "/deleteDeliverychallan",
  checkAccess.checkAccess("deliveryChallan", "delete"),
  delivery_ChallansController.delete
);
router.post(
  "/convertToInvoice",
  checkAccess.checkAccess("deliveryChallan", "create"),
  uploadImage,
  resizeImage,
  delivery_ChallansController.convertToInvoice
);

router.get(
  "/getDeliveryChallanNumber",
  delivery_ChallansController.getDeliveryChallanNumber
);

router.post("/:id/clone", delivery_ChallansController.cloneDeliveryChallans);

module.exports = router;
