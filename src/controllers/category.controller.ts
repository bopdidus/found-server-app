import { Authorized, JsonController } from "routing-controllers";
import CategoryService from "../services/category.service";


@Authorized()
@JsonController('/category')
export class CategoryController {

    constructor( private categoryService: CategoryService) { }

    

}