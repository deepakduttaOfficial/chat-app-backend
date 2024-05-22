import { NextFunction, Request, Response } from "express";
import passport from "passport";
export const callbackUrlMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const path = req.route.path;
  if (path === "/signup") {
    (passport as any)._strategies[
      "google"
    ]._callbackURL = `${baseUrl}/api/auth/google/signup`;
  } else if (path === "/signin") {
    (passport as any)._strategies[
      "google"
    ]._callbackURL = `${baseUrl}/api/auth/google/signin`;
  }
  next();
};
