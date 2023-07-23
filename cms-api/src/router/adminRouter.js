import express from "express";
import { hashPassword } from "../helper/bcrypt.js";
import {
  getAdminByEmail,
  insertAdmin,
  updateAdminById,
} from "../model/admin/adminModel.js";
import { newAdminValidation } from "../middleware/joiValidation.js";
import { accountVerificationEmail } from "../helper/nodeMailer.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", newAdminValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);

    //TODO create code and end with req.body

    req.body.verificationCode = uuidv4();

    const result = await insertAdmin(req.body);
    if (result?._id) {
      res.json({
        status: "success",
        message: "Please check your email for verification.",
      });

      const link = `${process.env.WEB_DOMAIN}/admin-verification?c=${result.verificationCode}&e=${result.email}`;
      await accountVerificationEmail({
        fName: result.fName,
        email: result.email,
        link,
      });
      return;
    }
    res.json({
      status: "error",
      message: "Unable to add new admin, Please try agian later",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      error.statusCode = 400;
      error.message = "The email is already in use.";
    }
    next(error);
  }
});

router.put("/verify", async (req, res, next) => {
  try {
    const { email, verificationCode } = req.body;

    // Find the user by email and verificationCode
    const user = await getAdminByEmail(email);

    if (!user) {
      return res.json({
        status: "error",
        message: "User not found.",
      });
    }
    if (user.verificationCode !== verificationCode) {
      return res.json({
        status: "error",
        message: "Sorry. Invalid verification code.",
      });
    }
    const updatedUser = await updateAdminById(user?._id, {
      isVerified: true,
      verificationCode: "",
    });

    // if (
    //   updatedUser.isVerified === true &&
    //   updatedUser.verificationCode === ""
    // ) {
    //   return res.json({
    //     status: "success",
    //     message: "Email has already been verified. You can now SignIn.",
    //   });
    // }
    if (updatedUser) {
      return res.json({
        status: "success",
        message: "Email has been verified. You can now SignIn.",
      });
    } else {
      return res.json({
        status: "error",
        message: "Failed to update user verification status.",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email and verificationCode
    const user = await getAdminByEmail(email);

    if (!user) {
      return res.json({
        status: "error",
        message: "User not found.",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
