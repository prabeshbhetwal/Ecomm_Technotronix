import express from "express";
import router from "./adminRouter.js";
import {
  getCategories,
  insertCategory,
} from "../model/category/categoryModel.js";
import slugify from "slugify";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.json({
        status: "error",
        message: "title is required",
      });
    }

    const obj = {
      title,
      slug: slugify(title, {
        trim: true,
        lower: true,
      }),
    };

    const result = await insertCategory(obj);
    result?._id
      ? res.json({
          status: "success",
          message: "New category has been added.",
        })
      : res.json({
          status: "error",
          message: "Unable to add new category.",
        });
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.json({
        status: "error",
        message: "title is required",
      });
    }

    const obj = {
      title,
      slug: slugify(title, {
        trim: true,
        lower: true,
      }),
    };

    const result = await getCategories();
    result?._id
      ? res.json({
          status: "success",
          message: "New category has been added.",
        })
      : res.json({
          status: "error",
          message: "Unable to add new category.",
        });
  } catch (error) {
    if (error.message.includes("E11000 Duplicate key error")) {
      error.statusCode = 200;
      error.message =
        "The slug of the category already exists, please change the category name and try again.";
    }
    next(error);
  }
});

export default router;
