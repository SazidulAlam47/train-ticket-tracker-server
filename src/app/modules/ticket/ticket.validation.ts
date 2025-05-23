import { DateTime } from 'luxon';
import { z } from 'zod';

const searchTickets = z.object({
    from: z.string(),
    to: z.string(),
    date: z
        .string()
        .date()
        .refine(
            (value) => {
                const date = DateTime.fromISO(value, {
                    zone: 'Asia/Dhaka',
                }).startOf('day');
                const today = DateTime.now()
                    .setZone('Asia/Dhaka')
                    .startOf('day');
                const maxDate = today.plus({ days: 10 });

                return date >= today && date <= maxDate;
            },
            {
                message:
                    'Date must be between today and 10 days from now (Asia/Dhaka)',
            },
        ),
});

export const TicketValidations = {
    searchTickets,
};
