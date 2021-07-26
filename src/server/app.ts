import * as express from 'express'
const bodyParser = require('body-parser'); 
import CategoryRoute from '../routes/category';
import ItemRoute from '../routes/item';
import UserRoute from '../routes/user'
const cors = require('cors')
require('dotenv').config()

class App{
    public app = express.Application
    public categoryRoute: CategoryRoute;
    public itemRoute: ItemRoute;
    public userRoute: UserRoute;

    constructor(){
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cors());

        this.categoryRoute = new CategoryRoute();
        this.itemRoute = new ItemRoute();
        this.userRoute = new UserRoute();

        this.categoryRoute.routes(this.app);
        this.itemRoute.routes(this.app);
        this.userRoute.routes(this.app);
    }

}

export default new App().app