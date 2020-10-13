const passport = require("passport");
const strategy = require("passport-facebook");

const FacebookStrategy = strategy.Strategy;


passport.use(
    new FacebookStrategy(
      {
        clientID: "768029043984414",
        clientSecret: "3e7ff27a095bf88349e1ee129db6d794",
        callbackURL: "http://localhost:4000/user-admin/facebook/callback",
        profileFields: ["email", "name"],
      },
      function (accessToken, refreshToken, profile, done) {
        const { email, first_name, last_name } = profile._json;
        const userData = {
          email: email,
          firstName: first_name,
          lastName: last_name,
        };
        console.log({ userData, accessToken, refreshToken });
        done(null, profile);
      }
    )
  );

module.exports = {
    login : passport.authenticate("facebook", {
        successRedirect: "/user-admin/home",
        failureRedirect: "/fail",
        session: false,
      })
}