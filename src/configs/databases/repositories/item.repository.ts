import { BaseRepository } from '../../../commons/database/base.repository';
import { ItemModel } from '../models/items.model';

export class ItemRepository extends BaseRepository<ItemModel> {
  constructor() {
    super();
  }

  findOneById(id: number) {
    const user = this.findOne({ id });
    return user;
  }

  createItem(data: Partial<ItemModel>) {
    return this.create(data);
  }
}
