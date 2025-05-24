"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketServices = void 0;
const axios_1 = __importDefault(require("axios"));
const capitalize_1 = __importDefault(require("../../utils/capitalize"));
const config_1 = __importDefault(require("../../config"));
const searchTickets = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const fromCity = payload.from.trim().replace(/ /g, '%20');
    const toCity = payload.to.trim().replace(/ /g, '%20');
    const date = new Date(payload.date)
        .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
        .replace(/ /g, '-');
    const axiosResponse = yield axios_1.default.get(`${config_1.default.shohoz_base_api}/v1.0/web/bookings/search-trips-v2?from_city=${fromCity}&to_city=${toCity}&date_of_journey=${date}&seat_class=S_CHAIR`);
    const apiResponse = axiosResponse.data;
    const availableTicketData = apiResponse.data.trains.reduce((acc, curr) => {
        const trainData = {
            trainName: curr.trip_number,
            departureDateTime: curr.departure_date_time,
            arrivalDateTime: curr.arrival_date_time,
            travelTime: curr.travel_time,
            originCity: (0, capitalize_1.default)(curr.origin_city_name),
            destinationCity: (0, capitalize_1.default)(curr.destination_city_name),
            seats: curr.seat_types.reduce((accS, currS) => {
                const seatCount = currS.seat_counts.online +
                    currS.seat_counts.offline;
                if (seatCount) {
                    accS.push({
                        class: currS.type,
                        fare: Number(currS.fare),
                        seatCount,
                    });
                }
                return accS;
            }, []),
        };
        if (trainData.seats.length) {
            acc.push(trainData);
        }
        return acc;
    }, []);
    const formattedResponse = [];
    availableTicketData.forEach((ticket) => {
        ticket.seats.forEach((seat) => {
            formattedResponse.push({
                trainName: ticket.trainName,
                departureDateTime: ticket.departureDateTime,
                arrivalDateTime: ticket.arrivalDateTime,
                travelTime: ticket.travelTime,
                from: ticket.originCity,
                to: ticket.destinationCity,
                class: seat.class,
                fare: seat.fare,
                seats: seat.seatCount,
                now: new Date(),
                link: `https://eticket.railway.gov.bd/booking/train/search?fromcity=${fromCity}&tocity=${toCity}&doj=${date}&class=${seat.class}`,
            });
        });
    });
    return formattedResponse;
});
exports.TicketServices = {
    searchTickets,
};
