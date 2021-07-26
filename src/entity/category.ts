import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Item } from "./item";

@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        length:100
    })
    name:string;

    @ManyToOne(type=> Category)
    @JoinColumn()
    father: Category

    @OneToMany(type => Item, item => item.category) 
    items: Item[];
}