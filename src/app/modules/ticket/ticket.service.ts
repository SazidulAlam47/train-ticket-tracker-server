/* eslint-disable @typescript-eslint/no-explicit-any */
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

const searchTickets = async (
    payload: TSearchTicketPayload,
    token: string | undefined,
    ssdk: string | undefined,
    uudid: string | undefined,
    xRequestedWith: string | undefined,
) => {
    if (!token || !ssdk || !uudid || !xRequestedWith) {
        throw new ApiError(status.UNAUTHORIZED, 'Unauthorized access');
    }

    const fromCity = formatStationNameShohoz(payload.from);
    const toCity = formatStationNameShohoz(payload.to);
    const date = formatDateShohoz(payload.date);

    let axiosResponse;
    try {
        axiosResponse = await axiosInstance.get(
            `/bookings/search-trips-v2?from_city=${fromCity}&to_city=${toCity}&date_of_journey=${date}&seat_class=S_CHAIR`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'x-device-key': ssdk,
                    'x-device-id': uudid,
                    'x-requested-with': xRequestedWith,
                },
            },
        );
    } catch (err: any) {
        throw new ApiError(err.status, err.message);
    }

    const shohozApiResponse = axiosResponse.data as IShohozApiResponse;

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
};
