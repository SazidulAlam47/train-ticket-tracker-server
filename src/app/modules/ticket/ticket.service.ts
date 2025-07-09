import {
    IShohozApiResponse,
    TMyResponse,
    TSearchTicketPayload,
} from './ticket.interface';
import ApiError from '../../errors/ApiError';
import status from 'http-status';
import formatDateError from '../../utils/formatDateError';
import formatDateShohoz from '../../utils/formatDateShohoz';
import formatStationNameShohoz from '../../utils/formatStationNameShohoz';
import axiosInstance from '../../helpers/axiosInstance';
import { UserServices } from '../user/user.service';

const searchTicketsWithAuth = async (payload: TSearchTicketPayload) => {
    try {
        const oldToken = await UserServices.getTokenFromDB();
        return await searchTickets(payload, oldToken);
    } catch {
        const newToken = await UserServices.loginToGetNewToken();
        return await searchTickets(payload, newToken);
    }
};

const searchTickets = async (payload: TSearchTicketPayload, token: string) => {
    const fromCity = formatStationNameShohoz(payload.from);
    const toCity = formatStationNameShohoz(payload.to);
    const date = formatDateShohoz(payload.date);

    const axiosResponse = await axiosInstance.get(
        `/bookings/search-trips-v2?from_city=${fromCity}&to_city=${toCity}&date_of_journey=${date}&seat_class=S_CHAIR`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    const shohozApiResponse = axiosResponse?.data as IShohozApiResponse;

    if (!shohozApiResponse?.data?.trains?.length) {
        throw new ApiError(
            status.NOT_FOUND,
            `No train found for ${payload.from} → ${payload.to}, ${formatDateError(payload.date)}`,
        );
    }

    const result = shohozApiResponse?.data?.trains?.reduce(
        (acc: TMyResponse, curr) => {
            const trainName = curr.trip_number;
            const departureDateTime = curr.departure_date_time;
            const arrivalDateTime = curr.arrival_date_time;
            const travelTime = curr.travel_time;
            const from = payload.from;
            const to = payload.to;

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
    searchTicketsWithAuth,
};
