import express from "express";
import { verifyJWTToken } from "../utils";
import { User } from "../models";

const prefix = '/api';

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  console.log(req.path);
  
  if (
    req.path === prefix + "/user/login" ||
    req.path === "/api"
  ) {
    return next();
  }

  let token: string | null =
    "authorization" in req.headers ? (req.headers.authorization as string) : null;
  
    if (token == null) {
      token = req.body.token;
    }
    if (token) {
      token = token?.replace('Bearer ', '');
      verifyJWTToken(token)
      .then((user: User | null) => {
        if (user) {
          console.log("Check auth   " + user);
          req.user = user;
        }
        next();
      })
      .catch((_) => {
        res.status(401).json({ message: "Invalid auth token provided." });
      });
  } else {

    res.status(401).json({ message: "No auth token provided." });
  }
};
