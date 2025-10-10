import { Router } from 'express';
import { TicketRoutes } from '../modules/ticket/ticket.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/tickets',
        route: TicketRoutes,
    },
    {
        path: '/users',
        route: UserRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
