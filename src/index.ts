import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path: `.env.${process.env.APP_ENV}`});
import { createServer } from 'http';
import createRoutes from './core/routes.js';
import SocketServer from './core/socket.js';
import './core/db.js';

const app = express();
const http = createServer(app);
const io = SocketServer(http);


createRoutes(app, io);

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

http.listen(PORT, function () {
  console.log(`Server: http://localhost:${PORT}`);
});

export { http, io };
