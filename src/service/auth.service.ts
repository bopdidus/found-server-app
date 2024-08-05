import { QueryRunner, Repository } from "typeorm";
import { User } from "../entity/User";

export class AuthService{
    private userRepository: Repository<User> = null;

    constructor(private queryRunner: QueryRunner)
    {
        this.userRepository = this.queryRunner.manager.getRepository(User);
    }

    async register(registerData: {lastname, firstname, email, birthdate, password})
    {
        const user = Object.assign(new User(), registerData)
        return this.userRepository.save(user);
    }

    async login( loginData: {email, password})
    {
        const user= await this.userRepository.findOne({
            where:{
                email: loginData.email,
                password:loginData.password
            }
        })

        if(!user){
            return "Unregistered user"
        }
        return user
    }
}