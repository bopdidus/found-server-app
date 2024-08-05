import { userRouter } from './route/user.route';
import passport from 'passport';
import { passportStrategy } from './middleware/auth.middleware';
import { authRouter } from './route/auth.route';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT? Number(process.env.PORT): 3000;
app.use(bodyParser.json())
app.use(passport.initialize())
passportStrategy();

//app.use('/auth', validateData(userSchema), authRouter);

// build all the route of the application
app.use('/users',passport.authenticate('jwt', { session: false }) ,userRouter);    
app.use('/auth', authRouter);    

//start the server
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
})

export default app;