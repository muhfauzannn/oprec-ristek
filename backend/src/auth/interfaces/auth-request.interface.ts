// src/auth/interfaces/auth-request.interface.ts
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}
