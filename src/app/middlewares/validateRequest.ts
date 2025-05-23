import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';
import catchAsync from '../utils/catchAsync';

type ZodSchema =
    | AnyZodObject
    | ZodEffects<AnyZodObject>
    | ZodEffects<ZodEffects<AnyZodObject>>;

const validateRequest = (schema: ZodSchema) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            req.body = await schema.parseAsync(req.body);
            next();
        },
    );
};

export default validateRequest;
