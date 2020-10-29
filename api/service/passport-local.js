import { Strategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcryptjs";
import signupValidator from "../middleware/validator";
import UserModel from "../model/user";

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findByPk(id, (err, user) => {
//     done(err, user);
//   });
// });

const authFields = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

passport.use(
  "signup",
  new Strategy(authFields, async (req, email, password, cb) => {
    // validate param
    const result = signupValidator(req.body);
    if (result.error) {
      return cb(null, false, { message: result.error.details[0].message });
    }

    const checkEmail = await UserModel.findOne({ where: { email } });
    if (checkEmail) {
      return cb(null, false, {
        statusCode: 409,
        message: "Email already exist",
      });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      // const hashPassword = await checkEmail.generateHash(req.body.password);

      const entry = { email: req.body.email, name: req.body.email.split("@")[0], password: hashPassword };

      const newUser = await UserModel.create(entry);

      cb(null, newUser, {
        message: newUser,
      });
    } catch (err) {
      return cb(null, false, { statusCode: 400, message: err });
    }
    return false;
  })
);

passport.use(
  "login",
  new Strategy(authFields, async (req, email, password, cb) => {
    /**/
    const user = await UserModel.findOne({ where: { email } });

    if (!user || !user.password) {
      return cb(null, false, { message: "Incorrect email or password." });
    }

    const checkPassword = await bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!checkPassword) {
      return cb(null, false, { message: "Incorrect email or passwohrd." });
    }
    try {
      cb(null, user, {
        message: "Logged In Successfully",
      });
    } catch (err) {
      return cb(null, false, { statusCode: 400, message: err });
    }
    return false;
  })
);
