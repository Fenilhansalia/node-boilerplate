const i18n = require("i18n");
const path = require("path");

i18n.configure({
  locales: ["en"],
  directory: path.join(__dirname, ""),
  defaultLocale: "en",
  cookie: "lang",
});

module.exports = (req, res, next) => {
  i18n.init(req, res);
  return next();
};
