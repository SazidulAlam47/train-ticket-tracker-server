import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
    {
        mobileNumber: {
            type: String,
            required: true,
            unique: true,
        },
        token: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const User = model<IUser>('User', userSchema);
