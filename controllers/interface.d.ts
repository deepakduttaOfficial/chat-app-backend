import { Request } from "express";
import { Profile } from "passport-google-oauth20";

export interface ISignUpRequest extends Request {
  user: Profile;
}
