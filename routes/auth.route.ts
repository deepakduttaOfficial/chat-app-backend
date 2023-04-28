import express, { Router } from "express";
import passport from "passport";
import { jwtAuthMiddleware } from "../middleware/auth.middleware";
import { signUp, protectedRoute } from "../controllers/auth.controller";
const router: Router = express.Router();

router.get(
  "/signup",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/redirect", passport.authenticate("google"), signUp);

router.get("/protected", jwtAuthMiddleware, protectedRoute);

export default router;
