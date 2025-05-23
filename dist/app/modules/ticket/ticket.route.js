"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const ticket_validation_1 = require("./ticket.validation");
const ticket_controller_1 = require("./ticket.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(ticket_validation_1.TicketValidations.searchTickets), ticket_controller_1.TicketControllers.searchTickets);
exports.TicketRoutes = router;
