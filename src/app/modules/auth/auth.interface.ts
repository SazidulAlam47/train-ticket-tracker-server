import { z } from 'zod';
import { AuthValidations } from './auth.validation';

export type TLoginPayload = z.infer<typeof AuthValidations.login>;

export interface ILoginResponse {
    data: IData;
    extra: IExtra;
}

export interface IData {
    message: string;
    nid_validated: number;
    token: string;
    user: IUser;
}

export interface IUser {
    passport: unknown;
    is_submitted_for_manual_verification: boolean;
    is_email_verification_required: boolean;
    is_email_verified: number;
    nid_validated: number;
    is_nid_verification_required: boolean;
}

export interface IExtra {
    hash: string;
}

export interface IProfile {
    display_name: string;
    email: string;
    phone_number: string;
    alternative_mobile_number: string;
    identification_type: number;
    identification_number: string;
    postal_code: string;
    address: string;
    dob: string;
    is_email_verified: number;
    is_email_verification_required: boolean;
    nid_validated: number;
}
