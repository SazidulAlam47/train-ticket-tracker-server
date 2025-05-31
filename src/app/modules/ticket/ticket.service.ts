import axios from 'axios';
import {
    IShohozApiResponse,
    TMyResponse,
    TSearchTicketPayload,
} from './ticket.interface';
import capitalize from '../../utils/capitalize';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import status from 'http-status';

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

    const shohozApiResponse = axiosResponse.data as IShohozApiResponse;

    if (!shohozApiResponse.data.trains.length) {
        throw new ApiError(
            status.NOT_FOUND,
            'No train found for selected dates or cities',
        );
    }

    const result = shohozApiResponse.data.trains.reduce(
        (acc: TMyResponse, curr) => {
            const trainName = curr.trip_number;
            const departureDateTime = curr.departure_date_time;
            const arrivalDateTime = curr.arrival_date_time;
            const travelTime = curr.travel_time;
            const from = capitalize(curr.origin_city_name);
            const to = capitalize(curr.destination_city_name);

            curr.seat_types.forEach((seat) => {
                const seatCount =
                    seat.seat_counts.online + seat.seat_counts.offline;
                if (seatCount) {
                    acc.push({
                        trainName,
                        departureDateTime,
                        arrivalDateTime,
                        travelTime,
                        from,
                        to,
                        class: seat.type,
                        fare: Number(seat.fare),
                        seats: seatCount,
                        now: new Date(),
                        link: `https://eticket.railway.gov.bd/booking/train/search?fromcity=${fromCity}&tocity=${toCity}&doj=${date}&class=${seat.type}`,
                    });
                }
            });

            return acc;
        },
        [],
    );

    return result;
};

export const TicketServices = {
    searchTickets,
};
