import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TicketValidations } from './ticket.validation';
import { TicketControllers } from './ticket.controller';

const router = express.Router();

router.post(
    '/',
    validateRequest(TicketValidations.searchTicketsWithAuth),
    TicketControllers.searchTicketsWithAuth,
);

export const TicketRoutes = router;
