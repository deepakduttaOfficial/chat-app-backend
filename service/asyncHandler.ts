import { Request, Response, NextFunction } from "express";

const asyncHandler =
  (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (error: any) {
      console.log(error);
      return res.status(error.code || 500).json({
        success: false,
        message: error.message,
      });
    }
  };

export default asyncHandler;
