import { Schema, model } from "mongoose";
import * as bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import envConfig from "../../config/env.config";
import crypto from "crypto";
import { UserDocument, UserInterface } from "./type.userSchema";
import AuthRoles from "../../utils/authRoles";

const userSchema = new Schema<UserInterface>(
  {
    firstName: {
      type: String,
      required: [true, "Enter your first name"],
      trim: true,
      maxLength: [25, "Name must be under 10 character"],
    },

    lastName: {
      type: String,
      required: [true, "Enter your last name"],
      trim: true,
      maxLength: [25, "Name must be under 10 character"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Enter your email"],
      trim: true,
    },

    password: {
      type: String,
      minLength: [4, "Password must be at least 4 charecter long"],
      required: [true, "Password is required"],
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verifyToken: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },

    loginCount: {
      type: Number,
      default: 0,
    },

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },

    profilePhoto: {
      photo_id: {
        type: String,
      },
      photo_url: {
        type: String,
      },
      photo_data: {
        type: String,
      },
    },

    googleData: {
      type: Object,
    },

    googleId: {
      type: String,
    },

    totalContact: {
      type: Number,
      default: 0,
    },

    virtualNumber: {
      type: Number,
      requied: true,
    },

    contactNumber: {
      type: Number,
    },

    aboutMe: {
      type: String,
    },

    isActive: Boolean,

    channelList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// bcrypt password
userSchema.pre("save", async function (next) {
  var user = this as UserDocument;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  return next();
});

// Virtul field
userSchema.virtual("fullName").get(function (this: UserDocument) {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  // Compare password
  comparePassword: async function (providedPassword: string): Promise<boolean> {
    return await bcrypt.compare(providedPassword, this.password);
  },

  //generate JWT TOKEN
  authJwtToken: function (data?: object): string {
    return jwt.sign(
      {
        _id: this._id,
        role: this.role,
        ...data,
      },
      envConfig.JWT_SECRET_AUTH as Secret,
      {
        expiresIn: envConfig.JWT_EXPIRY as string,
      }
    );
  },

  // Reset password token
  generateResetPasswordToken: function (): string {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.resetPasswordExpires = Date.now() + 20 * 60 * 1000;
    return resetToken;
  },
};

export default model<UserDocument>("User", userSchema);
