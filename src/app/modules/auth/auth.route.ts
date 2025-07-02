import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.get('/profile', AuthControllers.getProfile);

router.post(
    '/login',
    validateRequest(AuthValidations.login),
    AuthControllers.login,
);

export const AuthRoutes = router;
