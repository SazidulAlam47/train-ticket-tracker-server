"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const test = (req, res) => {
    res.send({ message: 'Train Ticket Tracker Server is Running...' });
};
// test route
app.get('/', test);
// application routes
app.use('/api/v1', routes_1.default);
// global error handler
app.use(globalErrorHandler_1.default);
// not found route
app.use(notFound_1.default);
exports.default = app;
