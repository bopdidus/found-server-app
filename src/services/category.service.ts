import { Category } from "../entity/category";
import {Request, Response} from 'express';
import { connection} from '../config/db';
import { CategoryRepository } from "../repositories/category.repository";
import { getManager } from "typeorm";
const bcrypt = require('bcrypt');


 class CategoryService {
/*
    public  find():Promise<Category[]>{
        return getManager().getRepository(Category).find({ relations: ['father']})
    }

    public findByFather(id: number): Promise<Category[]>{
        return getManager().getRepository(Category).find({
            where:{
                father: id
            }
        })
    }

    public findOne(id:number): Promise<Category>{
        return getManager().getRepository(Category).findOneOrFail(id);
    }

    public async create(category: any): Promise<Category>{
        console.log('je viens dentrer', category)
        let cat = getManager().getRepository(Category).create(category)[0];
        const newCate = await getManager().getRepository(Category).save(cat);
        return newCate;
    }

    public update(id: number, category: Category): Promise<any>{
        return getManager().getRepository(Category).update(id, category);
    }

    public async delete(id: number): Promise<any>{
        return getManager().getRepository(Category).delete(id);
    }*/

    public getCategories(req: Request, res: Response){
        connection.then(async database=>{
            const cats: Category[] = await database.getRepository(Category).find({ relations: ["father"] });
           // console.log(cats);
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
           // if(cat[0].father == undefined) { cat[0].father = null}
            database.getRepository(Category).save(cat).then(value=>{
                console.log(value)
                res.json(value);
               
            }).catch(err=>{
                console.log(err);
                res.status(500).send("There are some error")
                
            })
            
            
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
        console.log(req.params.categoryId)
        connection.then(async database=>{
          
            let results = await database.getRepository(Category).delete(req.params.categoryId);
            console.log(results)
            res.json(results);
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }
}

export default CategoryService;