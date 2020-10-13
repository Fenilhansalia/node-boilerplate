const router = require("express").Router();
const userAdminRoute = require("./userAdmin/userAdmin");
const superAdminRoute = require("./superAdmin/superAdmin");
const webRoute = require("./web/web");

router.use("/user-admin", userAdminRoute);
router.use("/super-admin", superAdminRoute);
router.use("/web", webRoute);

module.exports = router;
