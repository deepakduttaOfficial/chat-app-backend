import passport from "passport";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
  Profile,
} from "passport-google-oauth20";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import envConfig from "./env.config";
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = envConfig;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "",
    },
    (accessToken, refreshToken, profile: Profile, done: VerifyCallback) => {
      done(null, profile);
    }
  )
);

// Json-web-token
const options: StrategyOptions = {
  // jwtFromRequest: (req) => req.cookies.auth_token,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envConfig.JWT_SECRET_AUTH,
};
passport.use(
  new JwtStrategy(options, function (payload, done: VerifyCallback) {
    console.log(payload);
    done(null, payload);
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async (user: any, done) => {
  done(null, user);
});
