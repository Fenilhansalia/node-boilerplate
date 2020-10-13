const { register } = require('../../controllers/userAdmin/authController');

const router =  require('express').Router();
const { superAdminRegister, superAdminLogin } = require("../../controllers/superAdmin/authController");

//Login_register
router.post("/signup", superAdminRegister);
router.post("/signin", superAdminLogin)

module.exports = router;
