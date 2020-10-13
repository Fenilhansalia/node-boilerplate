const Joi = require('joi');
const Response = require('./Response');
const Helper = require('./Helper');

module.exports = {
  userAdminRegisterValidation: (req, res, callback) => {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(15).required(),
      last_name: Joi.string().min(3).max(15).required(),
      email: Joi.string().email().max(150).required(),
      password: Joi.string().min(8).required(),
    });
    const { error } = schema.validate(req);
    if (error) {
      Response.validationErrorResponseData(
        res,
        res.__(Helper.validationMessageKey('registerValidation', error)),
      );
    } else {
      return callback(true);
    }
  },
  userAdminLoginValidation: (req, res, callback) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate(req);
    if (error) {
      Response.validationErrorResponseData(
        res,
        res.__(Helper.validationMessageKey('loginValidation', error)),
      );
    } else {
      return callback(true);
    }
  },
};
