import {Request, Response} from 'express';
import CategoryRepository from '../repositories/category';

class CategoryRoute{
    private controller: CategoryRepository;

    constructor(){
        this.controller = new CategoryRepository();
    }

    public routes(app): void{
        app.get('/category', this.controller.getCategories);
        app.post('/category', this.controller.saveCategory);
        app.get('/category/:categoryId', this.controller.getCategory);
        app.delete('/category/:categoryId', this.controller.deleteCategory)
    }

}

export default CategoryRoute;