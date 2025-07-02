import axios from 'axios';
import { ILoginResponse, IProfile, TLoginPayload } from './auth.interface';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import status from 'http-status';

const login = async (payload: TLoginPayload) => {
    const axiosResponse = await axios.post(
        `${config.shohoz_base_api}/v1.0/web/auth/sign-in`,
        payload,
    );

    const res = axiosResponse.data as ILoginResponse;

    return {
        token: res.data.token,
    };
};

const getProfile = async (tokenBearer: string | undefined) => {
    if (!tokenBearer) {
        throw new ApiError(status.UNAUTHORIZED, 'You are not authorized');
    }
    const token = tokenBearer.split(' ')[1];
    if (!token) {
        throw new ApiError(status.UNAUTHORIZED, 'You are not authorized');
    }

    const axiosResponse = await axios.get(
        `${config.shohoz_base_api}/v1.0/web/auth/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    const res = axiosResponse.data.data as IProfile;

    return { name: res.display_name };
};

export const AuthServices = {
    login,
    getProfile,
};
