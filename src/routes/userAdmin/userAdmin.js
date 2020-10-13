const router = require('express').Router();
const {
  userAdminRegister,
  userAdminLogin,
} = require('../../controllers/userAdmin/authController');
const { userAdminTokenAuth } = require('../../middlewares/userAdminAuth');

//Login-Register
router.post('/signup', userAdminRegister);
router.post('/signin', userAdminLogin);
// router.get(
//   "/facebook",
//   userAdminLoginWithFacebook
// );
// router.get(
//   "/facebook/callback",
//   userAdminLoginWithFacebookCallback
// );

//dashboard


router.post('/home', userAdminTokenAuth, (req, res, next) => {
  res.json({ user: req.authUserId, messeage: 'Welcome to bizkard' });
});
router.get('/home', (req, res, next) => {
  res.json({ user: req.authUserId, messeage: 'Welcome to bizkard' });
});

module.exports = router;
