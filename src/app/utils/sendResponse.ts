import { Response } from 'express';

type TData<T> = {
    statusCode: number;
    message: string;
    data: T | null | undefined;
};

const sendResponse = <T>(res: Response, data: TData<T>) => {
    res.status(data.statusCode).json({
        success: true,
        message: data.message,
        data: data.data,
    });
};

export default sendResponse;
