import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Category } from "./category"

@Entity()
export class Item{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        length:100
    })
    title:string;

    @Column("text")
    comments:string;
   
    @Column("datetime")
    publishedDate:Date;

    @Column()
    image:string;

    @ManyToOne(type=> Category, category=> category.items)
    category: Category
}