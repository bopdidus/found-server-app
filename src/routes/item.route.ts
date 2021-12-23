import ItemRepository from '../services/item.service';
import * as multer from 'multer';
import { imageFilter, store } from '../middlewares/utils';
import ItemController from '../../controllers/item.controller';

const maxSize = 50 * 1024 * 1024;

const upload = multer({ storage: store});

class ItemRoute{
    private controller: ItemController;

    constructor(){
        this.controller = new ItemController();
    }

    public routes(app): void{
        app.get('/item', this.controller.getItems);
        app.get('/images', this.controller.getImages);
        app.post('/item', upload.single('image'), this.controller.saveItem);
        app.get('/item/:itemId', this.controller.getItem);
        app.delete('/item/:itemId', this.controller.deleteItem)
    }

}

export default ItemRoute;