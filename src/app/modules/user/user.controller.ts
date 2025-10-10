import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import getTokenFromTokenBearer from '../../routes/getTokenFromTokenBearer';

const getUserProfile = catchAsync(async (req, res) => {
    const token = getTokenFromTokenBearer(req.headers.authorization);
    const ssdk = req.headers['x-device-key'] as string | undefined;
    const uudid = req.headers['x-device-id'] as string | undefined;
    const xRequestedWith = req.headers['x-requested-with'] as
        | string
        | undefined;
    const result = await UserServices.getUserProfile(
        token,
        ssdk,
        uudid,
        xRequestedWith,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'User profile fetched successfully',
        data: result,
    });
});

export const UserControllers = {
    getUserProfile,
};
