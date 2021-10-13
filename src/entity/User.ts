import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from "typeorm";
import { IsEmail, IsDate, Min} from "class-validator";
import * as bcrypt from 'bcryptjs';

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

    @Column({default:false})
    isActivated:boolean;

    
    public static hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }

    public static comparePassword(user: User, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.password = await User.hashPassword(this.password);
    }
}
