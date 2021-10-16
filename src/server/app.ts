import * as express from 'express'
import * as bodyParser from 'body-parser'; 
import CategoryRoute from '../routes/category.route';
import ItemRoute from '../routes/item.route';
import UserRoute from '../routes/user.route';
import * as cors from 'cors';
import * as webpush from 'web-push';
import { connection} from '../config/db';

require('dotenv').config()

class App{
    public app = express.application
    public categoryRoute: CategoryRoute;
    public itemRoute: ItemRoute;
    public userRoute: UserRoute;

    constructor(){
        this.app = express();
        this.app.use(express.urlencoded({extended: false}))
        //this.app.use(bodyParser.json());
        //this.app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
       // this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(express.json());
        this.app.use(express.static(__dirname));
        //this.app.use(express.json());
        this.app.use(cors());
        //this.app.use(multer().any())

        this.routing()

        // for push notification
        this.app.post('/subscribe', (req, res)=>{
            let sub = req.body;
            res.set('Content-Type', 'application/json');
            webpush.setVapidDetails(
                'mailto:bopdidus@gmail.com',
                "BIrUKIPVB5BW7uxFCF8wihQOMhGzCZBxvDcb8JkzEyN3EhDOeemMwBXfc64MEHCzCz9QgQV4C1EAfKkuxwy0h2w",
                "smYIViZ5uOSwuIfxbOPwl2OLO2SgK2no-MxhXHZWr3o"
            );
            let payload = JSON.stringify({
                "notification":{
                    "title": "LOST VALLEY",
                    "body":"There are new updating"
                }
            });
            Promise.resolve(webpush.sendNotification(sub, payload))
            .then(()=> res.status(200).json({ message: 'Notification send'}))
            .catch(err=>{
                console.error(err)
                res.sendStatus(500)
            })
        })
    }

    routing(){
        connection.then(async database=>{
            this.categoryRoute = new CategoryRoute();
            this.itemRoute = new ItemRoute();
            this.userRoute = new UserRoute();
    
            this.categoryRoute.routes(this.app);
            this.itemRoute.routes(this.app);
            this.userRoute.routes(this.app);
        })
    }

}

export default new App().app