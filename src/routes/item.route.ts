import ItemRepository from '../services/item.service';
import * as multer from 'multer';
import { imageFilter, store } from '../middlewares/utils';
import itemService from '../services/item.service';
import {check_authorization} from '../middlewares/validation';

const maxSize = 50 * 1024 * 1024;

const upload = multer({ storage: store, fileFilter: imageFilter});

class ItemRoute{
    private controller: itemService;

    constructor(){
        this.controller = new itemService();
    }

    public routes(app): void{
        app.get('/item', this.controller.getItems);
        //app.get('/images', this.controller.getImages);
        app.post('/item', upload.single('image'), this.controller.saveItem);
        app.get('/item/:itemId', this.controller.getItem);
        app.delete('/item/:itemId', check_authorization, this.controller.deleteItem)
    }

}

export default ItemRoute;