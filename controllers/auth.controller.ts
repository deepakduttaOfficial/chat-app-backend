import { Request, Response } from "express";
import asyncHandler from "../service/asyncHandler";
import User from "../models/userSchema/user.schema";
import { Profile } from "passport-google-oauth20";
import { customAlphabet } from "nanoid";
import { INITIAL_PASSWORD, VIRTUAL_NUMBER } from "../utils/constant";
import AuthRoles from "../utils/authRoles";
import {
  UserDocument,
  UserInterface,
} from "../models/userSchema/type.userSchema";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as Profile;
  if (!user.emails) {
    return res.status(400).json({ message: "Email not found" });
  }

  const isExistUser = await User.findOne({ email: user.emails[0].value });
  if (isExistUser) {
    return res.status(401).json({ message: "Your are already signup" });
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
    email: user.emails[0].value,
    firstName: user.name?.familyName,
    lastName: user.name?.givenName,
    password: initialPasswordSetUp,
    isVerified: true,
    role: AuthRoles.USER,
    profilePhoto: {
      photo_url: user.photos ? user.photos[0].value : "",
    },
    googleData: user,
    googleId: user.id,
    virtualNumber: virtualNumber,
  };

  const newUser: UserDocument = await User.create(newUserData);

  return res.status(200).json({ success: true });
});

export const protectedRoute = asyncHandler(
  async (req: Request, res: Response) => {
    return res
      .status(200)
      .json({ success: true, message: "This is a Protected route" });
  }
);
