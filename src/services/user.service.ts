import { User } from "../entity/User";
import {Request, Response} from 'express';
import {EntityRepository, getManager} from "typeorm";
import {validate} from "class-validator";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcryptjs';
import {sendEmail} from '../middlewares/nodemailer-middleware';
import { decrypt } from '../middlewares/utils';


 class UserRepository {

    public async getUsers(req: Request, res: Response){
        const users: User[] = await getManager().getRepository(User).find();
        res.json(users);
    }
   
    public async saveUser (req: Request, res: Response) {
        
            const errors = await validate(req.body);
            console.log(req.body, "body")
            try {
                if(req.body.email != null && req.body.email != undefined){
                
                    if (errors.length > 0) {
                        throw new Error(`Validation failed!`); 
                    } else {
                        const emailExist = await getManager().getRepository(User).findOne({email:req.body.email});
                        if(emailExist) return res.status(400).send("Email already exists")
        
                        // Hash
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(req.body.password, salt)
                        req.body.password = hashPassword;
                        sendEmail(req.body.email, "Account activation", req.body.email+'/'+new Date());
                        let urs = await getManager().getRepository(User).create(req.body);
                        let results = await getManager().getRepository(User).save(urs);
                        res.json(results);
                    }
                }
                else{
                    res.status(500).send("Error server")
                }
               
            } catch (error) {
                console.error("Error ", error);
                res.status(500).send(error)
            }
           
    }

    public async activationAccount(req: Request, res: Response){
        console.log(req.params.activation, "email encrypted");
        let tab = decrypt(req.params.activation);
        let email = tab.split('/')[0];
        console.log(email, "email to")
        
            const user = await getManager().getRepository(User).findOneOrFail({email:email});
            user.isActivated = true;
            let results = await getManager().getRepository(User).save(user);
            res.json("account activated done with success"); 
        
    }
    
    public async login(req: Request, res: Response){
        
        try {
            if(req.body.username!= undefined && req.body.password != null){

                console.log(req.body.username, "email login")
                
                const user = await getManager().getRepository(User).findOneOrFail({email:req.body.username});
                if(!user) return res.status(400).send("Email or Password is Wrong")
    
                if(user.isActivated == false){
                    return res.status(500).send("Your account is not activated")
                }
    
                const validPass = await bcrypt.compare(req.body.password, user.password)
                if(!validPass) return res.status(400).send("Email or Password is Wrong");
                
                const token = jwt.sign({_id: user.email}, process.env.TOKEN_SECRET)
                res.json({"result":user, "token": token});
            
            }else{
                return res.status(500).send("No parameters in post request")
            }
        } catch (error) {
            console.error("Error ", error);
            res.status(500).send(error);
        }
        
    }

    public async getUser (req: Request, res: Response){
        
        try {
            let results = await getManager().getRepository(User).findOneOrFail(req.params.userId);
            res.json(results);
        } catch (error) {
            console.error("Error ", error);
            res.status(500).send(error);
        }
    }
    
    public async deleteUser (req: Request, res: Response){
        try{
           
            let results = await getManager().getRepository(User).delete(req.params.userId);
            res.json(results);
       
        }catch(error) {
            console.error("Error ", error);
            res.status(500).send(error);
        }
    }
}

export default UserRepository;