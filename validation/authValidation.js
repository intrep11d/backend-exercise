// validation/authValidation.js
const Joi = require('joi');

// Registration Schema
const registrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required()
    .messages({
      'string.base': `"username" should be a type of 'text'`,
      'string.empty': `"username" cannot be an empty field`,
      'string.min': `"username" should have a minimum length of {#limit}`,
      'string.max': `"username" should have a maximum length of {#limit}`,
      'any.required': `"username" is a required field`
    }),
  password: Joi.string().min(6).required()
    .messages({
      'string.base': `"password" should be a type of 'text'`,
      'string.empty': `"password" cannot be an empty field`,
      'string.min': `"password" should have a minimum length of {#limit}`,
      'any.required': `"password" is a required field`
    }),
  email: Joi.string().email().required()
    .messages({
      'string.email': `"email" must be a valid email`,
      'any.required': `"email" is a required field`
    })
});

// Login Schema
const loginSchema = Joi.object({
  username: Joi.string().required()
    .messages({
      'string.empty': `"username" cannot be an empty field`,
      'any.required': `"username" is a required field`
    }),
  password: Joi.string().required()
    .messages({
      'string.empty': `"password" cannot be an empty field`,
      'any.required': `"password" is a required field`
    })
});

module.exports = {
  registrationSchema,
  loginSchema
};