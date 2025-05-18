import { Request, Response } from 'express';

export async function checkHealth(req: Request, res: Response): Promise<void> {
  try {
    const healthCheck = {
      status: 'UP',
      message: 'Service is running',
      timestamp: new Date(),
    };

    res.status(200).json(healthCheck);
  } catch (error) {
    res.status(500).json({ status: 'DOWN', error: error });
  }
}