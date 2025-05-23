"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = (err === null || err === void 0 ? void 0 : err.message) || 'Something went wrong';
    const error = err;
    if (err instanceof zod_1.ZodError) {
        statusCode = http_status_1.default.UNPROCESSABLE_ENTITY;
        message = 'Validation Error';
    }
    res.status(statusCode).json({
        success: false,
        message,
        error,
    });
};
exports.default = globalErrorHandler;
