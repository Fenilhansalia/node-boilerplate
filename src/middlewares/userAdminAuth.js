const jwt = require("jsonwebtoken");
const Response = require("../service/Response");
const { BAD_REQUEST } = require("../service/Constants");

module.exports = {
  userAdminTokenAuth: (req, res, next) => {
    const token = req.headers.token;
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET.toString());
      const currentTime = Date.now();
      if (decoded.exp) {
        if (decoded.exp * 1000 < currentTime) {
          Response.errorResponseData(res, res.__("invalidtoken"), BAD_REQUEST);
        } else {
          if (decoded.id) {
            req.authUserId = decoded.id;
            return next();
          } else {
            Response.errorResponseData(
              res,
              res.__("invalidtoken"),
              BAD_REQUEST
            );
          }
        }
      } else {
        if (decoded.id) {
          req.authUserId = decoded.id;
          return next();
        } else {
          Response.errorResponseData(res, res.__("invalidToken"), BAD_REQUEST);
        }
      }
    } catch (err) {
      Response.errorResponseData(res, err.message, BAD_REQUEST);
    }
  },
};
