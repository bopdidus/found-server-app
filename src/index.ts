import app from './app';
import { AppDataSource } from './database/data-source';



AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
    //create express app
    
   app
    
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
 });






