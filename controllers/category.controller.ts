import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Category } from "../src/entity/category";
import CategoryService from "../src/services/category.service";

class CategoryController{
    
    constructor(){
    }

    public async getCategories(req: Request, res: Response){
       
        const cats: Category[] = await CategoryService.find();
        console.log(cats);
        res.status(201).send(cats);
        
    }

   

    public async saveCategory (req: Request, res: Response) {
        console.log(req.body)
        let results = await CategoryService.create(req.body);
        res.status(200).send(results);
        
    }

    public getCategory (req: Request, res: Response){
        let results =  CategoryService.findOne(  req.params.categoryId as unknown as number);
         res.status(200).send(results);
    }
    
    public deleteCategory (req: Request, res: Response){
        let results = CategoryService.delete(req.params.categoryId as unknown as number);
        res.status(201).send(results);
    }

}
export default CategoryController;