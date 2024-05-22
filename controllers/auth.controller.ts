import { Response } from "express";
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
import { ISignUpRequest } from "./interface";

/****************************************************
 * @desc: Sign up with google
 * @route: GET /api/auth/google/redirect
 * @access: Public
 * @type: Controller
 * @middleware: passport.authenticate("google")
 * @param: req, res
 * @response: Redirect to /api/auth/credential
 * @errors: 400, 401
 * @developer: Deepak Dutta
 * @date: 29-Mar-2022
 *****************************************************/
export const signUp = asyncHandler(
  async (req: ISignUpRequest, res: Response) => {
    const user = req.user;
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

    const initialPasswordSetUp = customAlphabet(INITIAL_PASSWORD, 5)();

    const newUserData: UserInterface = {
      email: user.emails[0].value, // Unique
      firstName: user.name?.givenName,
      lastName: user.name?.familyName,
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
      envConfig.DOMAIN +
        "/api/auth/credential?token=" +
        newUser.authJwtToken(tokenData)
    );
  }
);

/****************************************************
 * @desc: Sign in with google
 * @route: GET /api/auth/google/signin
 * @access: Public
 * @type: Controller
 * @middleware: passport.authenticate("google")
 * @param: req, res
 * @response: Redirect to /api/auth/credential
 * @errors: 400, 401
 * @developer: Deepak Dutta
 * @date: 29-Mar-2022
 * ***************************************************/
export const signIn = asyncHandler(
  async (req: ISignUpRequest, res: Response) => {
    const user = req.user;
    if (!user.emails) {
      return res.status(400).json({ message: message.EMAIL_NOT_FOUND });
    }

    const isExistUser = await User.findOne({ email: user.emails[0].value });
    if (!isExistUser) {
      return res.status(401).json({ message: message.EMAIL_NOT_FOUND });
    }

    const tokenData = {
      fullName: isExistUser.fullName,
      virtualNumber: isExistUser.virtualNumber,
      password: isExistUser.password,
    };

    res
      .cookie("auth_token", isExistUser.authJwtToken(tokenData), {
        httpOnly: true,
      })
      .redirect(
        envConfig.DOMAIN +
          "/api/auth/credential?token=" +
          isExistUser.authJwtToken(tokenData)
      );
  }
);

/****************************************************
 * @desc: Get user credential
 * @route: GET /api/auth/credential
 * @access: Private
 * @type: Controller
 * @middleware: jwtAuthMiddleware
 * @param: req, res
 * @response: User data
 * @errors: 400
 * @developer: Deepak Dutta
 * @date: 29-Mar-2022
 * ***************************************************/
export const credential = asyncHandler(
  async (req: ISignUpRequest, res: Response) => {
    if (!req.user) res.status(400).json("Invalid token");
    return res.status(200).json(req.user);
  }
);
