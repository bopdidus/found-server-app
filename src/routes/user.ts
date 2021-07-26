import UserRepository from '../repositories/user';
import * as Auth from '../middlewares/verifytoken';

class UserRoute{
    private controller: UserRepository;

    constructor(){
        this.controller = new UserRepository();
    }

    public routes(app): void{
        app.get('/user', this.controller.getUsers);
        app.post('/user', this.controller.saveUser);
        app.post('/login', Auth ,this.controller.login);
        app.get('/user/:userId', this.controller.getUser);
        app.delete('/user/:userId', this.controller.deleteUser)
    }

}

export default UserRoute;