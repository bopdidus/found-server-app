import * as express from 'express'

import {save} from '../controller/auth.controller';
import { validateData } from '../middleware/user.middleware';
import { loginSchema, userSchema } from '../validator/user.validator';

export const authRouter = express.Router();


authRouter.route('/register', validateData(userSchema)).post(save)


