import ItemRepository from '../repositories/item';
import * as multer from 'multer';
import { imageFilter, store } from '../middlewares/utils';

const maxSize = 50 * 1024 * 1024;

const upload = multer({ storage: store});

class ItemRoute{
    private controller: ItemRepository;

    constructor(){
        this.controller = new ItemRepository();
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