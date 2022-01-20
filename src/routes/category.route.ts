import {Request, Response} from 'express';
import categoryService from '../services/category.service';
import {check_authorization} from '../middlewares/validation';

class CategoryRoute{
    private controller: categoryService;

    constructor(){
        this.controller = new categoryService();
    }

    public routes(app): void{
        app.get('/categories', this.controller.getCategories);
        app.post('/category', check_authorization, this.controller.saveCategory);
        app.get('/category/:categoryId', this.controller.getCategory);
        app.delete('/category/:categoryId', check_authorization, this.controller.deleteCategory)
    }

}

export default CategoryRoute;