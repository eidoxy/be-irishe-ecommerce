import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/token';
import { ResponseError } from './responseError';

export interface AuthenticatedRequest extends Request {
  admin?: TokenPayload;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      throw new ResponseError(401, 'Authorization header is required');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new ResponseError(401, 'Authorization header must start with "Bearer "');
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.substring(7);
    
    if (!token) {
      throw new ResponseError(401, 'Access token is required');
    }

    // Verify token using your token utility
    const decoded = verifyToken(token);
    
    if (!decoded) {
      throw new ResponseError(401, 'Invalid or expired token');
    }

    // Add admin info to request object
    req.admin = decoded;

    next();
  } catch (error) {
    next(error);
  }
};