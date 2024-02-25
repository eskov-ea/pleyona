import { BaseError, HttpError, ErrorType, DBError, AccessError } from "../structs/Errors";
import express from "express";


export default (err: any, _: express.Request, res: express.Response, __: express.NextFunction) => {
  let error;
  console.log("Error handler:   " + err.message);
  switch (err.type) {
    case ErrorType.HTTP_ERROR:
      error = err as HttpError;
      return res.status(error.statusCode).json({
        "status": "error",
        "message": error.message
      });
    case ErrorType.INTERNAL_SERVER_ERROR:
      error = err as BaseError;
      return res.status(500).json({
        "status": "error",
        "message": error.message
      });
    case ErrorType.DB_ERROR:
      error = err as DBError;
      return res.status(500).json({
        "status": "error",
        "message": error.message
      });
      case ErrorType.GENERAL_ERROR:
        error = err as BaseError;
        return res.status(500).json({
          "status": "error",
          "message": error.message
        });
      case ErrorType.ACCESS_ERROR:
        error = err as AccessError;
        return res.status(401).json({
          "status": "error",
          "message": error.message
        });
    default:
      return res.status(500).json({
        "status": "error",
        "message": "Uncaught internal error"
      });
  }
}