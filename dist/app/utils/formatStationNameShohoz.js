"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatStationNameShohoz = (station) => {
    return station.trim().replace(/ /g, '%20');
};
exports.default = formatStationNameShohoz;
