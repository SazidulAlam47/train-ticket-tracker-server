import { TLoginPayload } from './user.interface';
import axiosInstance from '../../helpers/axiosInstance';
import ApiError from '../../errors/ApiError';
import status from 'http-status';
import { User } from './user.model';
import config from '../../config';

const loginToGetNewToken = async () => {
    const payload: TLoginPayload = {
        mobile_number: config.account_number,
        password: config.account_pass,
    };

    const axiosResponse = await axiosInstance.post('/auth/sign-in', payload);

    const token = axiosResponse?.data?.data?.token as string;

    if (!token) {
        throw new ApiError(status.UNAUTHORIZED, 'Token not found');
    }

    const user = await User.findOne({ mobileNumber: config.account_number });

    if (user) {
        await User.findOneAndUpdate(
            { mobileNumber: config.account_number },
            { mobileNumber: config.account_number, token },
        );
    } else {
        await User.create({ mobileNumber: config.account_number, token });
    }

    return token;
};

const getTokenFromDB = async () => {
    const user = await User.findOne({ mobileNumber: config.account_number });

    if (!user) {
        throw new ApiError(status.NOT_FOUND, 'User not found');
    }

    return user.token;
};

export const UserServices = {
    loginToGetNewToken,
    getTokenFromDB,
};
