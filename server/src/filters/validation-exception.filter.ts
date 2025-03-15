import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    let message = 'An error occurred';
    let errors = [];

    // validation errors (e.g., class-validator errors)
    if (
      exceptionResponse['message'] &&
      Array.isArray(exceptionResponse['message'])
    ) {
      message = 'Validation failed';
      errors = exceptionResponse['message'].map((error: ValidationError) => ({
        field: error.property,
        constraints: error.constraints,
      }));
    }
    // custom errors (e.g., BadRequestException)
    else if (exceptionResponse['message']) {
      message = exceptionResponse['message'];
      errors = [{ field: null, constraints: [message] }];
    } else {
      message = 'Unexpected error occurred';
    }

    response.status(status).json({
      statusCode: status,
      message,
      errors,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
