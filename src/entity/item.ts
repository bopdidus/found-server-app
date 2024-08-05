import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from "typeorm"
import { Category } from "./category"

@Entity()
export class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    filename: string

    @Column({default:0})
    views: number

    @Column("text")
    description:string

    @Column({})
    isPublished:boolean
    
    @ManyToOne(()=> Category, (category)=> category.items)
    category: Category
}