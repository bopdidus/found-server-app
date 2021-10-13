import { User,UserRole } from "../entity/User";
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from "typeorm";

export default class CreateUsers implements Seeder {
    run(factory: Factory, connection: Connection): Promise<any> {
       console.log(factory, "value factory")
      return  factory(User)().create()
    }
    


   
}