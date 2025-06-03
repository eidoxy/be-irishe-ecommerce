import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const allowedOrigins = process.env.ALLOW_ORIGINS ? process.env.ALLOW_ORIGINS.split(',') : [];
const env = process.env.NODE_ENV === 'production';

// CORS configuration
// const corsOptions = {
//   origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
//     // Allow requests with no origin (like mobile apps, curl requests, etc)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
//       // Origin is allowed
//       callback(null, true);
//     } else {
//       // Origin is not allowed
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(helmet());

// Logging - use 'combined' format in production for more details
app.use(morgan(env ? 'combined' : 'dev'));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

export default app;