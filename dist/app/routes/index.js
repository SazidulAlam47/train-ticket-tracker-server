"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_route_1 = require("../modules/ticket/ticket.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/tickets',
        route: ticket_route_1.TicketRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
