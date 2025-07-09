export interface IUser {
    mobileNumber: string;
    token: string;
}

export type TLoginPayload = {
    mobile_number: string;
    password: string;
};
