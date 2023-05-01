import express, { Router } from "express";
import passport from "passport";
import { jwtAuthMiddleware } from "../middleware/auth.middleware";
import { signUp, credential } from "../controllers/auth.controller";
const router: Router = express.Router();

router.get(
  "/signup",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/redirect", passport.authenticate("google"), signUp);

router.get("/credential", jwtAuthMiddleware, credential);

export default router;
