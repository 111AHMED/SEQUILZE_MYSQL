// version 17.6
const Joi = require("joi");

const signupSchema = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).trim(),
    lastName: Joi.string().required().min(3).trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(4).required().trim(),
  });
  return schema.validate(body);
};
const signinSchema = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(4).required().trim(),
  });
  return schema.validate(body);
};
module.exports = { signupSchema, signinSchema };
