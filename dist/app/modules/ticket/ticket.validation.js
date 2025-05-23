"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketValidations = void 0;
const luxon_1 = require("luxon");
const zod_1 = require("zod");
const searchTickets = zod_1.z.object({
    from: zod_1.z.string(),
    to: zod_1.z.string(),
    date: zod_1.z
        .string()
        .date()
        .refine((value) => {
        const date = luxon_1.DateTime.fromISO(value, {
            zone: 'Asia/Dhaka',
        }).startOf('day');
        const today = luxon_1.DateTime.now()
            .setZone('Asia/Dhaka')
            .startOf('day');
        const maxDate = today.plus({ days: 10 });
        return date >= today && date <= maxDate;
    }, {
        message: 'Date must be between today and 10 days from now (Asia/Dhaka)',
    }),
});
exports.TicketValidations = {
    searchTickets,
};
