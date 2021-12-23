import { Item } from "../entity/item";
import {Request, Response} from 'express';
import { getManager } from "typeorm";
const maxSize = 50 * 1024 * 102

 class ItemService {

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



/*
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
                
                console.log(path.resolve(directoryPath+ file))
                res.setHeader("Content-Type", "image/png")
                res.download(path.resolve(directoryPath+ file))
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
    }*/
}

export default new ItemService();