"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const month_constant_1 = require("../constants/month.constant");
const formatDateError = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getUTCDate();
    const month = month_constant_1.monthNames[date.getUTCMonth()];
    return `${day} ${month}`;
};
exports.default = formatDateError;
