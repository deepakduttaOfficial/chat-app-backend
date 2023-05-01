import { Request, Response } from "express";
import { Profile } from "passport-google-oauth20";
import { customAlphabet } from "nanoid";

// Custom files
import asyncHandler from "../service/asyncHandler";
import User from "../models/userSchema/user.schema";
import { INITIAL_PASSWORD, VIRTUAL_NUMBER, message } from "../utils/constant";
import AuthRoles from "../utils/authRoles";
import {
  UserDocument,
  UserInterface,
} from "../models/userSchema/type.userSchema";
import envConfig from "../config/env.config";

// Controller
export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as Profile;
  if (!user.emails) {
    return res.status(400).json({ message: message.EMAIL_NOT_FOUND });
  }

  const isExistUser = await User.findOne({ email: user.emails[0].value });
  if (isExistUser) {
    return res.status(401).json({ message: message.ALREADY_SIGNUP });
  }

  // Check if the virtual number is exist or not
  const isVirtualNumberExist = async (virtualNumber: number) => {
    if (await User.findOne({ virtualNumber })) {
      return true;
    }
    return false;
  };

  let virtualNumber: number;
  do {
    virtualNumber = Number(customAlphabet(VIRTUAL_NUMBER, 10)());
  } while (await isVirtualNumberExist(virtualNumber));
  // ---------------->
  const initialPasswordSetUp = customAlphabet(INITIAL_PASSWORD, 5)();

  const newUserData: UserInterface = {
    email: user.emails[0].value, // Unique
    firstName: user.name?.familyName,
    lastName: user.name?.givenName,
    password: initialPasswordSetUp,
    isVerified: true,
    role: AuthRoles.USER,
    profilePhoto: {
      photo_url: user.photos ? user.photos[0].value : "",
    },
    googleData: user,
    googleId: user.id, // Unique
    virtualNumber: virtualNumber, // Unique
  };

  // Response
  const newUser: UserDocument = await User.create(newUserData);
  const tokenData = {
    fullName: newUser.fullName,
    virtualNumber,
    password: initialPasswordSetUp,
  };

  res.redirect(
    envConfig.DOMAIN + "/credencial?token=" + newUser.authJwtToken(tokenData)
  );
});

export const credential = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) res.status(400).json("Invalid token");
  return res.status(200).json(req.user);
});
