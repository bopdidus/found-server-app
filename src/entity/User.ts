import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { IsEmail, IsDate, Min} from "class-validator";


export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @Column({unique:true})
    @IsEmail()
    email:string;

    @Column()
    @Min(8)
    password:string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createDate: string;

    

}
