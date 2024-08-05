import { QueryRunner } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { AuthService } from "../service/auth.service";
import {Request, Response} from 'express'
import { HttpStatusCode } from "../enum/http-status-code";
import { User } from "../entity/User";



const queryRunner: QueryRunner= AppDataSource.createQueryRunner();
const authService : AuthService = new AuthService(queryRunner);

export const save = async(request: Request, response: Response, next:Function)=>
    {
      try {
        
        const {firstname, lastname, email, password, birthdate} = request.body
        
        const user = Object.assign(new User(), {
            lastname,firstname, email,birthdate, password
        })
        const userCreated = await authService.register(user)
        return response.status(HttpStatusCode.CREATED).json(userCreated)
      } catch (error) {
        return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
      }
      
  
    }