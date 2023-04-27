import { Request, Response } from "express";
import asyncHandler from "../service/asyncHandler";

export const googleAuth = asyncHandler(async (req: Request, res: Response) => {
  return res.status(200).json({ success: true });
});

export const protectedRoute = asyncHandler(
  async (req: Request, res: Response) => {
    return res
      .status(200)
      .json({ success: true, message: "This is a Protected route" });
  }
);
