import { AppError, Result } from "../result/Result.js";
import { ErrorCodes } from "./ErrorCodes.js";

export * from "./ErrorCodes.js";

export const Errors = {
  validation(message: string, details?: any): AppError {
    return { code: ErrorCodes.VALIDATION_ERROR, message, details };
  },

  authentication(message: string = "User must be authenticated."): AppError {
    return { code: ErrorCodes.AUTHENTICATION_ERROR, message };
  },

  authorization(message: string = "User is not authorized to perform this action."): AppError {
    return { code: ErrorCodes.AUTHORIZATION_ERROR, message };
  },

  notFound(message: string, details?: any): AppError {
    return { code: ErrorCodes.NOT_FOUND_ERROR, message, details };
  },

  conflict(message: string, details?: any): AppError {
    return { code: ErrorCodes.CONFLICT_ERROR, message, details };
  },

  infrastructure(message: string, details?: any): AppError {
    return { code: ErrorCodes.INFRASTRUCTURE_ERROR, message, details };
  },

  unexpected(message: string = "An unexpected error occurred.", details?: any): AppError {
    return { code: ErrorCodes.UNEXPECTED_ERROR, message, details };
  }
};
