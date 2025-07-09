import { Router } from 'express';
import { TicketRoutes } from '../modules/ticket/ticket.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/tickets',
        route: TicketRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
