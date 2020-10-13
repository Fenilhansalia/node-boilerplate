module.exports = {
  /**
   * @description This function use for format success response of rest api
   * @param data
   * @param code
   * @param message
   * @param res
   * @param extras
   * @returns {{data: *, meta: {message: *, code: *}}}
   */

  successResponseData(res, data, code = 1, message, extras) {
    const response = {
      data,
      meta: {
        code,
        message,
      },
    };
    if (extras) {
      Object.keys(extras).forEach((key) => {
        if ({}.hasOwnProperty.call(extras, key)) {
          response.meta[key] = extras[key];
        }
      });
    }
    return res.send(response);
  },
  successResponseWithoutData(res, message, code = 1) {
    const response = {
      data: null,
      meta: {
        code,
        message,
      },
    };
    return res.send(response);
  },

  errorResponseData(res, message, code = 400) {
    const response = {
      data: null,
      meta: {
        code,
        message,
      },
    };
    return res.send(response);
  },
  validationErrorResponseData(res, message, code = 400) {
    const response = {
      data: null,
      meta: {
        code,
        message,
      },
    };
    return res.send(response);
  },
};
