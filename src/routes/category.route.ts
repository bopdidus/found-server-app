import {Request, Response} from 'express';
import CategoryController from '../../controllers/category.controller';
import CategoryRepository from '../services/category.service';

class CategoryRoute{
    private controller: CategoryController;

    constructor(){
        this.controller = new CategoryController();
    }

    public routes(app): void{
        app.get('/categories', this.controller.getCategories);
        app.post('/category', this.controller.saveCategory);
        app.get('/category/:categoryId', this.controller.getCategory);
        app.delete('/category/:categoryId', this.controller.deleteCategory)
    }

}

export default CategoryRoute;