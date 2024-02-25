export abstract class ErrorType {
  static HTTP_ERROR = "HTTP";
  static INTERNAL_SERVER_ERROR = "SERVER";
  static DB_ERROR = "DB";
  static GENERAL_ERROR = "GENERAL_ERROR";
  static NOT_FOUND_ERROR = "NOT_FOUND_ERROR";
  static ACCESS_ERROR = "NOT_FOUND_ERROR";
}

export class BaseError extends Error {
  message: string;
  description: string;
  isOperational: boolean;
  type: ErrorType;

  constructor(message: string, description: string, isOperational: boolean, type: ErrorType) {
    super();
    this.message = message;
    this.description = description;
    this.isOperational = isOperational;
    this.type = type;
  }
}

export class HttpError extends BaseError {
  statusCode: number;

  constructor(statusCode: number, message: string, description: string, isOperational: boolean) {
    super(message, description, isOperational, ErrorType.HTTP_ERROR);
    this.statusCode = statusCode;
  }
}

export class DBError extends BaseError {
  
  constructor(message: string, description: string, isOperational: boolean) {
    super(message, description, isOperational, ErrorType.DB_ERROR);
  }
}

export class AccessError extends BaseError {
  
  constructor(message: string, description: string, isOperational: boolean) {
    super(message, description, isOperational, ErrorType.ACCESS_ERROR);
  }
}