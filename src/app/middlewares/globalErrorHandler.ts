/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import status from 'http-status';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode: number = err?.statusCode || status.INTERNAL_SERVER_ERROR;
    let message: string = err?.message || 'Something went wrong';
    const error = err;

    if (err instanceof ZodError) {
        statusCode = status.UNPROCESSABLE_ENTITY;
        message = 'Validation Error';
    }

    res.status(statusCode).json({
        success: false,
        message,
        error,
    });
};

export default globalErrorHandler;
