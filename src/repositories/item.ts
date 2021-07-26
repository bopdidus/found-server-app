import { Item } from "../entity/item";
import {Request, Response} from 'express';
import { connection} from '../config/db';

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
   
    public saveItem (req: Request, res: Response) {
        connection.then(async database=>{
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