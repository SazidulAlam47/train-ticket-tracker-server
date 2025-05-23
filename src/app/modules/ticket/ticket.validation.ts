import { z } from 'zod';

const searchTickets = z.object({
    from: z.string(),
    to: z.string(),
    date: z.string().date(),
});

export const TicketValidations = {
    searchTickets,
};
