import { Document } from "mongoose";
import AuthRoles from "../../utils/authRoles";

export interface Photo {
  photo_id?: string;
  photo_url?: string;
  photo_data?: object | string;
}

export interface UserInterface {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  isActive?: boolean;
  isVerified?: boolean;
  verifyToken?: string;
  loginCount?: number;
  resetPasswordToken?: String;
  resetPasswordExpires?: Date;
  profilePhoto?: Photo;
  role: AuthRoles;
  googleData: object;
  googleId: string;
  totalContact?: number;
  virtualNumber: number;
  contactNumber?: number;
  aboutMe?: string;
  createdAt?: Date;
  updatedAt?: Date;
  channelList?: string[];
  groupChannelList?: string[];
}

export interface UserDocument extends UserInterface, Document {
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(providedPassword: string): Promise<string>;
  authJwtToken(tokenData?: object): string;
  generateResetPasswordToken(): string;
}
