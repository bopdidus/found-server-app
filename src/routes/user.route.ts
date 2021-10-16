import UserRepository from '../services/user.service';
import * as Auth from '../middlewares/verifytoken';

class UserRoute{
    private controller: UserRepository;

    constructor(){
        this.controller = new UserRepository();
    }

    public routes(app): void{
        app.get('/users', this.controller.getUsers);
        app.post('/user', this.controller.saveUser);
        app.post('/login', this.controller.login);
        app.get('/user/activation/:activation', this.controller.activationAccount);
        app.get('/user/:userId', this.controller.getUser);
        app.delete('/user/:userId', this.controller.deleteUser)
    }

}

export default UserRoute;