"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: true,
        message: data.message,
        data: data.data,
    });
};
exports.default = sendResponse;
