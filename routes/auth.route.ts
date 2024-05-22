import express, { Router } from "express";
import passport from "passport";
import { jwtAuthMiddleware } from "../middleware/auth.middleware";
import { signUp, credential, signIn } from "../controllers/auth.controller";
import { callbackUrlMiddleware } from "../middleware/callback.url.middleware";
const router: Router = express.Router();

router.get(
  "/signup",
  callbackUrlMiddleware,
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/signup", passport.authenticate("google"), signUp);

router.get(
  "/signin",
  callbackUrlMiddleware,
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/signin", passport.authenticate("google"), signIn);

router.get("/credential", jwtAuthMiddleware, credential);

export default router;
