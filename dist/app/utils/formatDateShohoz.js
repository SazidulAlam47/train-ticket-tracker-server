"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const month_constant_1 = require("../constants/month.constant");
const formatDateShohoz = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = month_constant_1.monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
};
exports.default = formatDateShohoz;
