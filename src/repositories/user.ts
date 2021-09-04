import { User } from "../entity/User";
import {Request, Response} from 'express';
import { connection} from '../config/db';
import {validate} from "class-validator";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcryptjs';


 class UserRepository {

    constructor(){}

    public getUsers(req: Request, res: Response){
        connection.then(async database=>{
            const users: User[] = await database.getRepository(User).find();
            res.json(users);
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }
   
    public saveUser (req: Request, res: Response) {
        connection.then(async database=>{
            console.log(req.body)
            const errors = await validate(req.body);
            if (errors.length > 0) {
                throw new Error(`Validation failed!`); 
            } else {
                const emailExist = await database.getRepository(User).findOne({email:req.body.email});
                if(emailExist) return res.status(400).send("Email already exists")

                // Hash
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(req.body.password, salt)
                req.body.password = hashPassword;
                let urs = await database.getRepository(User).create(req.body);
                let results = await database.getRepository(User).save(urs);
                res.json(results);
            }
            
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }

    public login(req: Request, res: Response){
        connection.then(async database=>{
            const user = await database.getRepository(User).findOneOrFail({email:req.body.email});
            if(!user) return res.status(400).send("Email or Password is Wrong")

            const validPass = await bcrypt.compare(req.body.password, user.password)
            if(!validPass) return res.status(400).send("Email or Password is Wrong");
            
            const token = jwt.sign({_id: user.email}, process.env.TOKEN_SECRET)
            res.json({"result":user, "auth-token": token});
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }

    public getUser (req: Request, res: Response){
        connection.then(async database=>{
            let results = await database.getRepository(User).findOneOrFail(req.params.userId);
            res.json(results);
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }
    
    public deleteUser (req: Request, res: Response){
        connection.then(async database=>{
            let results = await database.getRepository(User).delete(req.params.userId);
            res.json(results);
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }
}

export default UserRepository;