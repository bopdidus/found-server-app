import * as Joi from 'joi';
import { connection} from '../config/db';
import { User } from '../entity/User';
import * as jwt from "jsonwebtoken";

//Register Validation
export const validateObject = (schema: Joi.Schema, data: any): any => {
    const res = schema.validate(data, { stripUnknown: true });
  
    if(res.error) {
      throw new Error('failed validation');
    }
  
    return res.value;
  }

export const check_authorization = (req, res, next) =>{
    console.log('cest arriver');
  const Email = req.header('auth-email');

  if(!Email) return res.status(501).send('Access Denied');

  try {
    
      connection.then(async database=>{
        let userRight =  await database.getRepository(User).findOne({email: Email})
        
        if(userRight){
          console.log(userRight,'alles ist ok');
          
           next();
        }else{
          res.status(500).send("Access denied");
        }

        }).catch(error =>{
            console.error("Error ", error);
            res.status(500).send("Internal Server Error");
        })

      } catch (error) {
          res.status(400).send("Invalid token");
      }
  
}