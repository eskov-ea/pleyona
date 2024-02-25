import express from "express";
import { validationResult } from "express-validator";
import connection from '../core/db';
import { AccessError, DBError } from "../structs/Errors";


export default class {

  getConfig = async (req: express.Request, res: express.Response, next: express.NextFunction):Promise<void> => {
    try {
      const passengerStatusesSQL = 'SELECT * FROM `passenger_status_list`';
      const personClassesSQL = 'SELECT * FROM `person_class_list`';
      const configSQL = 'SELECT * FROM `config`';

      const [passengerStatuses] = await connection(passengerStatusesSQL);
      const [personClasses] = await connection(personClassesSQL);
      const [configData] = await connection(configSQL);

      console.log('PS::  ', passengerStatuses);
      console.log('PC::  ', personClasses);
      console.log('CG::  ', configData);

      res.status(200).json({
        message: "Successfully get config.",
        statuses: passengerStatuses,
        classes: personClasses,
        config: configData
      });
    } catch (err) {
      let error = new DBError(err.message, "Error happend quering config data within DB", true);
      return next(error);
    }
  }
}