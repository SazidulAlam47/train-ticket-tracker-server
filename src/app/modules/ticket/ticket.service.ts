import axios from 'axios';
import { IApiResponse, TSearchTicketPayload } from './ticket.interface';
import capitalize from '../../utils/capitalize';

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
        `https://railspaapi.shohoz.com/v1.0/web/bookings/search-trips-v2?from_city=${fromCity}&to_city=${toCity}&date_of_journey=${date}&seat_class=S_CHAIR`,
    );

    const apiResponse = axiosResponse.data as IApiResponse;

    const result = apiResponse.data.trains.map((train) => ({
        trainName: train.trip_number,
        departureDateTime: train.departure_date_time,
        arrivalDateTime: train.arrival_date_time,
        travelTime: train.travel_time,
        originCity: capitalize(train.origin_city_name),
        destinationCity: capitalize(train.destination_city_name),
        classes: train.seat_types.map((seat) => ({
            class: seat.type,
            fare: seat.fare,
            seatCount: seat.seat_counts.online + seat.seat_counts.offline,
        })),
    }));

    return result;
};

export const TicketServices = {
    searchTickets,
};
