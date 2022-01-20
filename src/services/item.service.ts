import { Item } from "../entity/item";
import {Request, Response} from 'express';
import { getManager } from "typeorm";
import { connection} from '../config/db';
import * as fs from 'fs';
import * as path from 'path';

const maxSize = 50 * 1024 * 102

 class ItemService {
/*
    public  find():Promise<Item[]>{
        return getManager().getRepository(Item).find({ relations: ['father']})
    }

    public findByFather(id: number): Promise<Item[]>{
        return getManager().getRepository(Item).find({
            where:{
                father: id
            }
        })
    }

    public findOne(id:number): Promise<Item>{
        return getManager().getRepository(Item).findOneOrFail(id);
    }

    public async create(item: any): Promise<Item>{
        item.publishedDate = new Date()
        let cat = getManager().getRepository(Item).create(item)[0];
        const newCate = await getManager().getRepository(Item).save(cat);
        return newCate;
    }

    public update(id: number, item: Item): Promise<any>{
        return getManager().getRepository(Item).update(id, item);
    }

    public async delete(id: number): Promise<any>{
        return getManager().getRepository(Item).delete(id);
    }



*/
    public getItems(req: Request, res: Response){
        connection.then(async database=>{
            const items: Item[] = await database.getRepository(Item).find();

            res.status(201).send(items); 
        }).catch(error =>{
            console.error("Error ", error);
            res.status(500).send(error);
        })
    }

   /* public getImages(req:Request, res: Response){
        
        const directoryPath = "./uploads/";
        fs.readdir(directoryPath, function(err, files){
            if(err){
                res.status(500).send({"message":err.message})
            }
            console.log(files)
            let photos = [];
            files.forEach((file)=>{
                
                fs.readFile(path.resolve(directoryPath+ file), function(err, content) {
                    if (err) {
                        res.status(500).send({"message":err.message})
                    }
                    photos.push(content);
                  }); 
            })
            res.send(photos)
        })
    }
   */
    public saveItem (req: Request, res: Response) {
        if(req.body.title != undefined){
            connection.then(async database=>{
                try {
                    req.body.publishedDate = new Date()
                    let its = await database.getRepository(Item).create(req.body);
                    let results = await database.getRepository(Item).save(its);
                    
                    res.json(results);
                } catch (error) {
                    res.status(501).send("there are some errors")
                }
               
            }).catch(error =>{
                console.error("Error ", error);
                res.json(error);
            })
        }else{
            res.status(500).send("Error")
        }
       
    }

    public getItem (req: Request, res: Response){
        connection.then(async database=>{
            let results = await database.getRepository(Item).findOne(req.params.itemId, {relations:['category']});
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

export default  ItemService;