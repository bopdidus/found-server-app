import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
    email:string;

    @Column("double")
    phoneNumber: number;

    @Column()
    password:string;

}
