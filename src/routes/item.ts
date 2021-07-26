import {Request, Response} from 'express';
import ItemRepository from '../repositories/item';

class ItemRoute{
    private controller: ItemRepository;

    constructor(){
        this.controller = new ItemRepository();
    }

    public routes(app): void{
        app.get('/item', this.controller.getItems);
        app.post('/item', this.controller.saveItem);
        app.get('/item/:itemId', this.controller.getItem);
        app.delete('/item/:itemId', this.controller.deleteItem)
    }

}

export default ItemRoute;