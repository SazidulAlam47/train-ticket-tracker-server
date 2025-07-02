import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const login = catchAsync(async (req, res) => {
    const result = await AuthServices.login(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Logged in successfully',
        data: result,
    });
});

const getProfile = catchAsync(async (req, res) => {
    const result = await AuthServices.getProfile(req.headers.authorization);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Profile Data fetched successfully',
        data: result,
    });
});

export const AuthControllers = {
    login,
    getProfile,
};
