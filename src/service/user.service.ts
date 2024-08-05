import { QueryRunner, Repository } from "typeorm";
import { User } from "../entity/User";

export class UserService{
    private userRepository: Repository<User> = null;

    constructor(private queryRunner: QueryRunner)
    {
        this.userRepository = this.queryRunner.manager.getRepository(User);
    }

    async getUsers(){
        return this.userRepository.find();
    }

    async getUserByID(userId:string){
        const user= await this.userRepository.findOne({
            where:{
                id:userId
            }
        })

        if(!user){
            return "Unregistered user"
        }
        return user
    }

 

    async delete(id:string){

        let userToRemove = await this.userRepository.findOneBy({id});
        if( !userToRemove){
        return "this user not exist"
        }
        await this.userRepository.remove(userToRemove)

        return "User has been removed"
    }

}