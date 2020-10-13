//imports

const { asuperAdminRegisterValidation, superAdminLoginValidation } = require("../../service/superAdminValidation");

//imports models

//exports

module.exports = {
  /**
   * @description user admin register controller
   * @param req
   * @param res
   */
  superAdminRegister: async (req, res, next) => {
    const requestParams = req.body;
    asuperAdminRegisterValidation(requestParams, res, async (validate) => {
      if (validate) {
        console.log(validate);
      }
    });
  },
  superAdminLogin: async (req, res, next) => {
    const requestParams = req.body;
    superAdminLoginValidation(requestParams, res, async (validate) => {
      if (validate) {
        await db
        console.log(validate);
      }
    });
  },
};
