import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { logger } from '@/helpers/logger/pino';

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: Response, next: NextFunction) {
    const status = error.httpCode || error.status || 500;
    if (status < 300) {
      return next();
    }
    const message = error.message;
    let errors = error.errors;

    if (Array.isArray(errors) && errors.length > 0) {
      const firstError = errors[0];
      if (firstError.constraints) {
        const firstConstraintKey = Object.keys(firstError.constraints)[0];
        errors = firstError.constraints[firstConstraintKey];
      }
    }

    logger.error({
      name: error.name,
      message: message,
      errors: errors,
    });

    response.status(status).json({
      success: false,
      name: error.name,
      message: message,
      errors: errors,
    });
  }
}
