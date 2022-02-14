import UserRepository from '../services/user.service';
import * as Auth from '../middlewares/verifytoken';
import { check_authorization } from '../middlewares/validation';

class UserRoute{
    private controller: UserRepository;

    constructor(){
        this.controller = new UserRepository();
    }

    public routes(app): void{
        app.get('/users', [Auth, check_authorization], this.controller.getUsers);
        app.post('/admin/user', [Auth, check_authorization], this.controller.saveUser);
        app.post('/user',  this.controller.saveUser);
        app.post('/login', this.controller.login);
        app.get('/user/activation/:activation', this.controller.activationAccount);
        app.get('/user/:userId', this.controller.getUser);
        app.delete('/user/:userId', [Auth, check_authorization], this.controller.deleteUser)
    }

}

export default UserRoute;