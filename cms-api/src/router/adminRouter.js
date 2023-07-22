import express from "express";
import { hashPassword } from "../helper/bcrypt.js";
import { insertAdmin } from "../model/admin/adminModel.js";
import { newAdminValidation } from "../middleware/joiValidation.js";
import { accountVerificationEmail } from "../helper/nodeMailer.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", newAdminValidation, async (req, res, next) => {
  try {
    error.statusCode = 400;
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
  } catch (error) {
    if (errorMsg.message.includes("E11000 duplicate key error")) {
      errorMsg.message = "The email is already in use.";
    }
    next(errorMsg);
  }
});

export default router;
