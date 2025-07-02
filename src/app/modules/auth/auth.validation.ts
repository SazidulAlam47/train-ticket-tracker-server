import { z } from 'zod';

const login = z.object({
    mobile_number: z.string().regex(/^01\d{9}$/, {
        message: 'Number must be 11 digits and start with 01',
    }),
    password: z.string(),
});

export const AuthValidations = {
    login,
};
