import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Item } from "../src/entity/item";
import ItemService from "../src/services/item.service";
import * as fs from 'fs';
import * as path from 'path';

class ItemController{
    
    constructor(){
    }
/*
    public async getItems(req: Request, res: Response){
       
        const cats: Item[] = await ItemService.find();
        console.log(cats);
        res.status(201).send(cats);
        
    }

    public async saveItem (req: Request, res: Response) {
        console.log(req.body)
        let results = await ItemService.create(req.body);
        res.status(200).send(results);
        
    }

    public getItem (req: Request, res: Response){
        let results =  ItemService.findOne(  req.params.categoryId as unknown as number);
         res.status(200).send(results);
    }
    
    public deleteItem (req: Request, res: Response){
        let results = ItemService.delete(req.params.categoryId as unknown as number);
        res.status(201).send(results);
    }

    public getImages(req:Request, res: Response){
        
        const directoryPath = "./uploads/";
        fs.readdir(directoryPath, async function(err, files){
            if(err){
                res.status(500).send({"message":err.message})
            }
          
            await  files.forEach((file)=>{
                
                console.log(path.resolve(directoryPath+ file))
                res.setHeader("Content-Type", "image/png")
                res.download(path.resolve(directoryPath+ file))
            })
            
        })
    }
*/
}
export default ItemController;