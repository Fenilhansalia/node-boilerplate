//imports
const Response = require('../../service/Response');
const { SUCCESS, FAIL } = require('../../service/Constants');
const Transformer = require('object-transformer');
const { signup, login } = require('../../transformers/AuthTransformer');
const brcypt = require('bcrypt');
//const passport = require('passport');
//const strategy = require('passport-facebook');

const {
  userAdminRegisterValidation,
  userAdminLoginValidation,
} = require('../../service/userAdminValidation');

//imports models
const db = require('../../models');
const { issueAdmin } = require('../../service/jwtToken');

// const FacebookStrategy = strategy.Strategy;

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: '768029043984414',
//       clientSecret: '3e7ff27a095bf88349e1ee129db6d794',
//       callbackURL: 'http://localhost:4000/user-admin/facebook/callback',
//       profileFields: ['email', 'name'],
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       const { email, first_name, last_name } = profile._json;
//       const { id, provider } = profile;
//       const userData = {
//         email: email,
//         firstName: first_name,
//         lastName: last_name,
//       };
//       await db.facebookAdmin
//         .findOne({
//           where: {
//             email: email,
//           },
//         })
//         .then(async (user) => {
//           if (user) {
//             console.log('user exists');
//           } else {
//             console.log('user does not exists');
//           }
//         });
//       done(null, profile);

//       //console.log({ userData, accessToken, refreshToken, profile });
//     }
//   )
// );

//exports
module.exports = {
  /**
   * @description user admin register controller
   * @param req
   * @param res
   */
  userAdminRegister: async (req, res, next) => {
    const requestParams = req.body;
    userAdminRegisterValidation(requestParams, res, async (validate) => {
      if (validate) {
        await db.admin
          .findOne({
            where: { email: requestParams.email },
          })
          .then(async (admin) => {
            if (admin) {
              Response.successResponseWithoutData(
                res,
                res.__('emailalreadyexists'),
                FAIL
              );
            } else {
              const salt = await brcypt.genSalt(10);
              const hashPassword = await brcypt.hash(
                requestParams.password,
                salt
              );
              await db.admin
                .create({
                  first_name: requestParams.first_name,
                  last_name: requestParams.last_name,
                  email: requestParams.email,
                  password: hashPassword,
                })
                .then(async (updated) => {
                  if (updated) {
                    Response.successResponseData(
                      res,
                      new Transformer.Single(updated, signup).parse(),
                      SUCCESS,
                      res.__('userregistered')
                    );
                  } else {
                    Response.successResponseWithoutData(
                      res,
                      res.__('internalerror'),
                      FAIL
                    );
                  }
                })
                .catch((e) => {
                  Response.successResponseWithoutData(
                    res,
                    res.__('internalerror'),
                    FAIL
                  );
                });
            }
          });
      }
    });
  },
  userAdminLogin: async (req, res, next) => {
    const requestParams = req.body;
    userAdminLoginValidation(requestParams, res, async (validate) => {
      if (validate) {
        await db.admin
          .findOne({
            where: {
              email: requestParams.email,
            },
          })
          .then(async (userExists) => {
            if (userExists) {
              const validPass = await brcypt.compare(
                requestParams.password,
                userExists.password
              );
              if (!validPass) {
                Response.successResponseWithoutData(
                  res,
                  res.__('invalidcredentials'),
                  FAIL
                );
              } else {
                let response = {};
                response.first_name = userExists.first_name;
                response.last_name = userExists.last_name;
                response.email = userExists.email;
                response.token = issueAdmin(userExists.id);
                Response.successResponseData(
                  res,
                  new Transformer.Single(response, login).parse(),
                  SUCCESS,
                  res.__('userloggedin')
                );
              }
            } else {
              Response.successResponseWithoutData(
                res,
                res.__('invaliduser'),
                FAIL
              );
            }
          })
          .catch((e) => {});
      }
    });
  },
  // userAdminLoginWithFacebook: passport.authenticate('facebook', {
  //   scope: ['email'],
  // }),
  // userAdminLoginWithFacebookCallback: passport.authenticate(
  //   'facebook',
  //   {
  //     // successRedirect: "/user-admin/home",
  //     // failureRedirect: "/fail",
  //     session: false,
  //   },
  //   (req, res) => {
  //     console.log({ res: res });
  //   }
  // ),
};
