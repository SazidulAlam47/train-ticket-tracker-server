import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TicketServices } from './ticket.service';

const searchTicketsWithAuth = catchAsync(async (req, res) => {
    const result = await TicketServices.searchTicketsWithAuth(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Tickets are fetched successfully',
        data: result,
    });
});

export const TicketControllers = {
    searchTicketsWithAuth,
};
