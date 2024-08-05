import { AppDataSource } from "../database/data-source";
import { passportStrategy } from "../middleware/auth.middleware";
import { authRouter } from "../route/auth.route";
import { userRouter } from "../route/user.route";
import passport from 'passport';
import bodyParser from 'body-parser';
import express, {Application} from 'express';
import app from "../app";

export class TestHelper{
    private static _instance: TestHelper;
    public app:Application;
    private constructor(){ this.app = express();}

    public static get instance():TestHelper{
        if(!this._instance) this._instance = new TestHelper();

        return this._instance;
    }



    async setupDB(){
        this.app=app;
       /* AppDataSource.initialize().then(() => {
            console.log("Data Source has been initialized!")
            //create express app
            
            app
            
          })
          .catch((err) => {
              console.error("Error during Data Source initialization", err)
         });*/
        
    }
}