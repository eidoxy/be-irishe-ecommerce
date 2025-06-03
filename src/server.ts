import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is running at PORT:${PORT}`);
});
