import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from './responseError';

export const errorHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: `Validation error: ${JSON.stringify(error)}`,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      error: error.message,
    });
  } else {
    res.status(500).json({
      error: `Internal server error: ${error.message}`,
    });
  }
}