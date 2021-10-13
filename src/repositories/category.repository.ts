import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entity/category';


@EntityRepository(Category)
export class CategoryRepository extends Repository<Category>  {

}