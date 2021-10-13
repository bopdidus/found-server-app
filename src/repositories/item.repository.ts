import { EntityRepository, Repository } from 'typeorm';
import { Item } from '../entity/item';



@EntityRepository(Item)
export class ItemRepository extends Repository<Item>  {

}