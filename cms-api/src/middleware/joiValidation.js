import Joi from "joi";

export const newAdminValidation = (req, res, next) => {
  try {
    //Define the schema
    const schema = Joi.object({
      fName: Joi.string().required().min(3).max(30),
      lName: Joi.string().required().min(3).max(30),
      email: Joi.string().email({
        minDomainSegments: 2,
      }),
      phone: Joi.string().required(),
      address: Joi.string().allow(""),
      password: Joi.string().required().min(6),
    });

    const { error } = schema.validate(req.body);

    //Check data against the rule

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
