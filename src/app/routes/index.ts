import { Router } from 'express';
import { TicketRoutes } from '../modules/ticket/ticket.route';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/tickets',
        route: TicketRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
