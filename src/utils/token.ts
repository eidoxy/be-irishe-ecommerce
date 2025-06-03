import type { JwtPayload, SignOptions } from 'jsonwebtoken';
import { sign, verify, decode } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  id: number;
  username: string;
  email: string;
}

export function createToken(payload: TokenPayload): string {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }

  return sign(
    payload, 
    secret, 
    { 
      expiresIn: process.env.JWT_EXPIRES_IN || '7d' 
    } as SignOptions
  );
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    const decoded = verify(token, secret) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function decodeToken<T extends JwtPayload>(token: string): T | null {
  try {
    return decode(token) as T;
  } catch (error) {
    console.error('Token decode failed:', error);
    return null;
  }
}