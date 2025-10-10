/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import ApiError from '../../errors/ApiError';
import axiosInstance from '../../helpers/axiosInstance';

const getUserProfile = async (
    token: string | undefined,
    ssdk: string | undefined,
    uudid: string | undefined,
    xRequestedWith: string | undefined,
) => {
    if (!token || !ssdk || !uudid || !xRequestedWith) {
        throw new ApiError(status.UNAUTHORIZED, 'Unauthorized access');
    }

    let axiosResponse;
    try {
        axiosResponse = await axiosInstance.get(`/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'x-device-key': ssdk,
                'x-device-id': uudid,
                'x-requested-with': xRequestedWith,
            },
        });
    } catch (err: any) {
        throw new ApiError(err.status, err.message);
    }

    const shohozApiResponse = axiosResponse.data;

    const result = {
        name: shohozApiResponse?.data?.display_name,
        email: shohozApiResponse?.data?.email,
        phone: shohozApiResponse?.data?.phone_number,
    };

    return result;
};

export const UserServices = {
    getUserProfile,
};
