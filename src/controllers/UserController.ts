import express from "express";
import { validationResult } from "express-validator";
import connection from '../core/db';
import md5 from 'md5';
import { User } from "../models";
import { AccessError, DBError } from "../structs/Errors";
import { createJWToken } from "../utils";

export default class {

  async login(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return; 
    } 
    const postData = {
      login: req.body.login,
      password: req.body.password,
    };
    console.log('LOGIN:: ', postData.login, postData.password);

    try {
    const sql = 'SELECT * FROM `users` WHERE `login` = ?';
    const [rows] = (await connection(sql, [postData.login]));

      if (rows.length > 1) {
        const error = new DBError('Duplicate result got', 'DB have multiple users by this credential', false);
        next(error);
      }
      const userObj = rows[0];
      
      if (userObj === undefined || md5(postData.password) != userObj.password) {
        res.status(403).json({
          message: "Incorrect password or email",
        });
      } else {
        const user = new User(userObj);
      console.log('USER OBJ', user);
      if (user.deletedAt !== null) {
          const error = new AccessError("User blocked", "Access denied", false);
          return next(error);
        }
        const token = createJWToken(user);
        
        res.status(200).header({
          'Content-Type': 'application/json; charset=utf-8'
        }).json({
          message: "Successfully logged in.",
          user,
          token: token
        });
      }
    } catch (err) {
      let error = new DBError(err.message, "Error happend quering data within DB", true);
      return next(error);
    }
    
  }

}