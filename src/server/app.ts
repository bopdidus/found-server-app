import * as express from 'express'
const bodyParser = require('body-parser'); 
import CategoryRoute from '../routes/category';
import ItemRoute from '../routes/item';
import UserRoute from '../routes/user';
import * as cors from 'cors';
import * as fileUpload from 'express-fileupload';
require('dotenv').config()

class App{
    public app = express.application
    public categoryRoute: CategoryRoute;
    public itemRoute: ItemRoute;
    public userRoute: UserRoute;

    constructor(){
        this.app = express();
        this.app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
       // this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(express.static(__dirname));
        this.app.use(cors());
        //this.app.use(multer().any())

        this.categoryRoute = new CategoryRoute();
        this.itemRoute = new ItemRoute();
        this.userRoute = new UserRoute();

        this.categoryRoute.routes(this.app);
        this.itemRoute.routes(this.app);
        this.userRoute.routes(this.app);
    }

}

export default new App().app