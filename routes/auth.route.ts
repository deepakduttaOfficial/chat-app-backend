import express, { Router } from "express";
import passport from "passport";
import { jwtAuthMiddleware } from "../middleware/auth.middleware";
import { googleAuth, protectedRoute } from "../controllers/auth.controller";
const router: Router = express.Router();

router.get(
  "/google",
  passport.authenticate("/google", { scope: ["email", "profile"] })
);

router.get("/google/redirect", passport.authenticate("google"), googleAuth);

router.get("/protected", jwtAuthMiddleware, protectedRoute);

export default router;
