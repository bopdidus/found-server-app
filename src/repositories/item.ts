import { Item } from "../entity/item";
import {Request, Response} from 'express';
import { connection} from '../config/db';
import * as fs from 'fs';
import * as path from 'path';
const maxSize = 50 * 1024 * 102

 class ItemRepository {

    constructor(){}

    public getItems(req: Request, res: Response){
        connection.then(async database=>{
            const items: Item[] = await database.getRepository(Item).find();
            
            res.json(items); 
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }

    public getImages(req:Request, res: Response){
        
        const directoryPath = "./uploads/";
        fs.readdir(directoryPath, async function(err, files){
            if(err){
                res.status(500).send({"message":err.message})
            }
           
          await  files.forEach((file)=>{
                res.writeHead(200,{"Content-Type": "image/png"})
                console.log(path.resolve(directoryPath+ file))
                res.end(path.resolve(directoryPath+ file))
            })
            
        })
    }
   
    public saveItem (req: Request, res: Response) {
        connection.then(async database=>{
            req.body.publishedDate = new Date()
            let its = await database.getRepository(Item).create(req.body);
            let results = await database.getRepository(Item).save(its);
            
            res.json(results);
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }

    public getItem (req: Request, res: Response){
        connection.then(async database=>{
            let results = await database.getRepository(Item).findOne(req.params.itemId);
            res.json(results);
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }
    
    public deleteItem (req: Request, res: Response){
        connection.then(async database=>{
            let results = await database.getRepository(Item).delete(req.params.itemId);
            res.json(results);
        }).catch(error =>{
            console.error("Error ", error);
            res.json(error);
        })
    }
}

export default ItemRepository;