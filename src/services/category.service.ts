import { Category } from "../entity/category";
import {Request, Response} from 'express';
import { connection} from '../config/db';
import { CategoryRepository } from "../repositories/category.repository";
const bcrypt = require('bcrypt');


 class CategoryService {

    constructor(
        private categoryRepository: CategoryRepository
    ){ }
    
    public find():Promise<Category[]>{
        return this.categoryRepository.find({ relations: ['father']})
    }

    public findByFather(id: number): Promise<Category[]>{
        return this.categoryRepository.find({
            where:{
                father: id
            }
        })
    }

    public findOne(id:number): Promise<Category>{
        return this.categoryRepository.findOne(id);
    }

    public async create(category: Category): Promise<Category>{
        const newCate = await this.categoryRepository.save(category);
        return newCate;
    }

    public update(id: number, category: Category): Promise<any>{
        return this.categoryRepository.update(id, category);
    }

    public async delete(id: number): Promise<any>{
        return  await this.categoryRepository.delete(id);
    }

    /*public getCategories(req: Request, res: Response){
        connection.then(async database=>{
            const cats: Category[] = await database.getRepository(Category).find({ relations: ["father"] });
            console.log(cats);
            res.json(cats);
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }

   

    public saveCategory (req: Request, res: Response) {
        console.log(req.body)
        connection.then(async database=>{
            let cat = await database.getRepository(Category).create(req.body);
            let results = await database.getRepository(Category).save(cat);
            res.json(results);
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }

    public getCategory (req: Request, res: Response){
        connection.then(async database=>{
            let results = await database.getRepository(Category).findOne(req.params.categoryId, { relations: ["items"] });
            res.json(results);
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }
    
    public deleteCategory (req: Request, res: Response){
        connection.then(async database=>{
            let results = await database.getRepository(Category).delete(req.params.categoryId);
            res.json(results);
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }*/
}

export default CategoryService;