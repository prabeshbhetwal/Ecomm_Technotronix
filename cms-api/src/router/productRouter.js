import express from "express";
import slugify from "slugify";
import { newProductValidation } from "../middleware/joiValidation.js";
import {
  deleteProductById,
  getProducts,
} from "../model/product/ProductModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getProducts();

    res.json({
      status: "success",
      message: " New Products has been added.",
      result: [],
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", newProductValidation, async (req, res, next) => {
  try {
    const { title } = req.body;
    !title &&
      res.json({ status: "error", message: "Product title is required." });

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
});

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
