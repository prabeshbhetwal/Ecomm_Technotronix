import express from "express";
import slugify from "slugify";
import { newProductValidation } from "../middleware/joiValidation.js";
import {
  deleteProductById,
  getProductById,
  getProducts,
} from "../model/product/ProductModel.js";
import multer from "multer";

const router = express.Router();

// ============  MULTER

const imgFolderPath = "public/img/product";
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let error = null;
    //Validation Check
    callback(error, imgFolderPath);
  },
  filename: (req, file, callback) => {
    let error = null;
    //Construct or Rename Filename
    const fullFileName = Date.now() + "-" + file.originalname;
    callback(error, fullFileName);
  },
});
//SETUP MULTER
const upload = multer({ storage });

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const products = _id ? await getProductById(_id) : await getProducts();

    res.json({
      status: "success",
      message: "New Products has been added.",
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  upload.array("images", 5),
  newProductValidation,
  async (req, res, next) => {
    try {
      console.log(req.files);
      if (req.files.length) {
        req.body.images = req.files.map((item) => item.path);
      }
      req.body.slug = slugify(req.body.name, { trim: true, lower: true });

      const result = await insertProduct(obj);

      result?._id
        ? res.json({
            status: "success",
            message: " New Product has been added",
          })
        : res.json({
            status: "error",
            message: "Error, Unable to add new Product.",
          });
    } catch (error) {
      if (error.message.includes("E11000 duplicate key error")) {
        error.statusCode = 200;
        error.message =
          "The slug for the Product already exist, please change the catgegory name ans try again.";
      }
      next(error);
    }
  }
);

// router.put("/", updateCatValidation, async (req, res, next) => {
//   try {
//     const result = await updateCategoryById(req.body);

//     result?._id
//       ? res.json({
//           status: "success",
//           message: "The category has been updated",
//         })
//       : res.json({
//           status: "error",
//           message: "Error, Unable to udpate new category.",
//         });
//   } catch (error) {
//     next(error);
//   }
// });

router.delete("/:_id", async (req, res, next) => {
  const { _id } = req.params;
  try {
    if (_id) {
      const result = await deleteProductById(_id);
      result?._id &&
        res.json({
          status: "success",
          message: "The Product has been deleted",
        });

      return;
    }

    res.json({
      status: "error",
      message: "Error, Unable to process your request.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
