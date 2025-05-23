import { RequestHandler } from 'express';
import status from 'http-status';

const notFound: RequestHandler = (req, res) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        message: 'API Not Found!!',
        error: {
            path: req.originalUrl,
            message: 'Your requested path is not found',
        },
    });
};

export default notFound;
