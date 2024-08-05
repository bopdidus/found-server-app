import {Request, Response} from 'express'
import { AppDataSource } from '../database/data-source';
import {User} from '../entity/User';
import { QueryRunner } from 'typeorm';
import { UserService } from '../service/user.service';
import { HttpStatusCode } from '../enum/http-status-code';


  const queryRunner: QueryRunner= AppDataSource.createQueryRunner();
  const userService : UserService = new UserService(queryRunner);

  export const all = async (request: Request, response: Response, next:Function)=>{
          try {
            const users = await userService.getUsers();
            return response.status(HttpStatusCode.OK).json(users)
          } catch (error) {
              return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
          }
      
   }


    export const one= async(request: Request, response: Response, next:Function) =>{
      try {
        const id = request.params.id
        const user = await userService.getUserByID(id)
        return response.status(HttpStatusCode.OK).json(user)
      } catch (error) {
        return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
      }
    
  }

  

  export const remove = async (request: Request, response: Response, next:Function)=>
  {
     try {
        const id = request.params.id
        const user = await userService.delete(id)
        return response.status(HttpStatusCode.OK).json(user)
      } catch (error) {
        return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
      }
  }


