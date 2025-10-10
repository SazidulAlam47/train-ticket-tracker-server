import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/profile', UserControllers.getUserProfile);

export const UserRoutes = router;
