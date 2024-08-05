import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Item } from "./item"

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @OneToMany(() => Category, (category) => category.headCategory)
    categories: Category[]

    @ManyToOne(() => Category, (headCategory) => headCategory.categories)
    headCategory: Category
    @OneToMany(()=> Item, (item)=> item.category)
    items: Item[]
}