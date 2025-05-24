import axios from 'axios';
import {
    IApiResponse,
    ISeatsResponse,
    ITrainResponse,
    TFormattedResponse,
    TSearchTicketPayload,
} from './ticket.interface';
import capitalize from '../../utils/capitalize';
import config from '../../config';

const searchTickets = async (payload: TSearchTicketPayload) => {
    const fromCity = payload.from.trim().replace(/ /g, '%20');
    const toCity = payload.to.trim().replace(/ /g, '%20');
    const date = new Date(payload.date)
        .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        .replace(/ /g, '-');

    const axiosResponse = await axios.get(
        `${config.shohoz_base_api}/v1.0/web/bookings/search-trips-v2?from_city=${fromCity}&to_city=${toCity}&date_of_journey=${date}&seat_class=S_CHAIR`,
    );

    const apiResponse = axiosResponse.data as IApiResponse;

    const availableTicketData = apiResponse.data.trains.reduce(
        (acc: ITrainResponse[], curr) => {
            const trainData = {
                trainName: curr.trip_number,
                departureDateTime: curr.departure_date_time,
                arrivalDateTime: curr.arrival_date_time,
                travelTime: curr.travel_time,
                originCity: capitalize(curr.origin_city_name),
                destinationCity: capitalize(curr.destination_city_name),
                seats: curr.seat_types.reduce(
                    (accS: ISeatsResponse[], currS) => {
                        const seatCount =
                            currS.seat_counts.online +
                            currS.seat_counts.offline;
                        if (seatCount) {
                            accS.push({
                                class: currS.type,
                                fare: Number(currS.fare),
                                seatCount,
                            });
                        }
                        return accS;
                    },
                    [],
                ),
            };

            if (trainData.seats.length) {
                acc.push(trainData);
            }
            return acc;
        },
        [],
    );

    const formattedResponse: TFormattedResponse = [];

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
};

export const TicketServices = {
    searchTickets,
};
