import { Entity, PrimaryGeneratedColumn, Column,  BeforeInsert  } from "typeorm"
import * as bcrypt from 'bcrypt'

@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    birthdate: Date

    @Column({unique: true})
    email:string

    @Column({nullable:true,default:new Date()})
    lastConnection:Date

    @Column({ type: 'varchar', length: 100, nullable: false }) password: string

    @BeforeInsert()
    async setPassword(password: string) {
      const salt = await bcrypt.genSalt()
      this.password = await bcrypt.hash(password || this.password, salt)
    }

}
