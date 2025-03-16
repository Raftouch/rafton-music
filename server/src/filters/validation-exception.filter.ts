import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();

    console.log('Exception Response:', exceptionResponse);

    let message = 'An error occurred';
    let errors = [];

    if (
      exceptionResponse['message'] &&
      Array.isArray(exceptionResponse['message'])
    ) {
      message = 'Validation failed';

      errors = exceptionResponse['message'].map((validationError: string) => {
        console.log('Validation Error:', validationError);

        if (validationError.includes('Username')) {
          return {
            field: 'username',
            constraints: [validationError],
          };
        } else if (validationError.includes('email')) {
          return {
            field: 'email',
            constraints: [validationError],
          };
        } else if (validationError.includes('Password')) {
          return {
            field: 'password',
            constraints: [validationError],
          };
        } else if (validationError.includes('genre')) {
          return {
            field: 'genre',
            constraints: [validationError],
          };
        } else if (validationError.includes('artist')) {
          return {
            field: 'artist',
            constraints: [validationError],
          };
        } else {
          return {
            field: 'unknown',
            constraints: [validationError],
          };
        }
      });
    }
    // errors like BadRequestException
    else if (exceptionResponse['message']) {
      message = exceptionResponse['message'];
      errors = [{ field: null, constraints: [message] }];
    } else {
      message = 'Unexpected error occurred';
    }

    console.log('Mapped Errors:', errors);

    response.status(status).json({
      statusCode: status,
      message,
      errors,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
