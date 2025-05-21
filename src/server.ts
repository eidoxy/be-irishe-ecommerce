import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
