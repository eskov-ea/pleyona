import bodyParser from "body-parser";
import express from "express";
import { checkAuth } from "../middlewares";
import { errorHandler } from "../middlewares";
import { Server } from 'socket.io';
import { UserController, ConfigController } from "../controllers";

const UserC = new UserController();
const ConfigC = new ConfigController();
const createRoutes = (app: express.Express, socketServer: Server) => {
  // const UserController = new UserCtrl(socketServer);

  const prefix = "/api";
  const errorHandlerHOF = (fn: Function) => (req: express.Request, res: express.Response, next: express.NextFunction) => 
    Promise.resolve(fn(req, res, next)).catch(next);
  
  // const corsOptions = {
  //   origin: '*',
  //   methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: "Content-Type,Authorization",
  //   credentials: true,
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204
  // }
    
  // app.use(cors(corsOptions));
  app.use(bodyParser.json({limit: '20mb'}));
  app.use(checkAuth);
  
  app.get("/api", (_: express.Request, res: express.Response, __: express.NextFunction) => {
    res.sendFile('/Users/john/Programming/practice/node/node_chat_ts/dist/index.html');
  });

  app.post(prefix + "/user/login", errorHandlerHOF(UserC.login));

  app.get(prefix + "/config", errorHandlerHOF(ConfigC.getConfig));

  // app.post(prefix + "/user/login", errorHandlerHOF(UserController.login));


  app.use(errorHandler)

};

export default createRoutes;
