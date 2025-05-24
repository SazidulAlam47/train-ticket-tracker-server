import { z } from 'zod';
import { TicketValidations } from './ticket.validation';

export interface IApiResponse {
    data: Data;
}

export interface Data {
    trains: Train[];
    selected_seat_class: string;
}

export interface Train {
    trip_number: string;
    departure_date_time: string;
    departure_full_date: string;
    departure_date_time_jd: string;
    arrival_date_time: string;
    travel_time: string;
    origin_city_name: string;
    destination_city_name: string;
    seat_types: SeatType[];
    train_model: string;
    is_open_for_all: boolean;
    is_eid_trip: number;
    parent_route: ParentRoute;
    boarding_points: BoardingPoint[];
    is_international: number;
    is_from_city_international: boolean;
}

export interface SeatType {
    key: number;
    type: string;
    trip_id: number;
    trip_route_id: number;
    route_id: number;
    fare: string;
    vat_percent: number;
    vat_amount: number;
    origin_city_seq: number;
    destination_city_seq: number;
    seat_counts: SeatCounts;
}

export interface SeatCounts {
    online: number;
    offline: number;
    is_divided: boolean;
}

export interface ParentRoute {
    origin_city_name: string;
    destination_city_name: string;
    departure_date: string;
    departure_time: string;
    arrival_date: string;
    arrival_time: string;
}

export interface BoardingPoint {
    trip_point_id: number;
    location_id: number;
    location_name: string;
    location_time: string;
    location_date: string;
}

export type TSearchTicketPayload = z.infer<
    typeof TicketValidations.searchTickets
>;

export interface ISeatsResponse {
    class: string;
    fare: number;
    seatCount: number;
}

export interface ITrainResponse {
    trainName: string;
    departureDateTime: string;
    arrivalDateTime: string;
    travelTime: string;
    originCity: string;
    destinationCity: string;
    seats: ISeatsResponse[];
}

export type TFormattedResponse = {
    trainName: string;
    departureDateTime: string;
    arrivalDateTime: string;
    travelTime: string;
    from: string;
    to: string;
    class: string;
    fare: number;
    seats: number;
    now: Date;
    link: string;
}[];
