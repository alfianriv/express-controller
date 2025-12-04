import { CreateItemDto } from '@/controllers/items/dto/create-item.dto';
import { UpdateItemDto } from '@/controllers/items/dto/update-item.dto';
import { ItemRepository } from '@/configs/databases/repositories/item.repository';
import { NotFoundError } from 'routing-controllers';

export class ItemService {
  constructor(private readonly itemRepository?: ItemRepository) {
    this.itemRepository = this.itemRepository ?? new ItemRepository();
  }

  findAll() {
    return this.itemRepository.findAll();
  }

  findOne(id: number, opts?: { validate?: boolean }) {
    const item = this.itemRepository.findOneById(id);
    if (!item && opts?.validate) {
      throw new NotFoundError('Item not found');
    }
    return item;
  }

  create(data: CreateItemDto) {
    return this.itemRepository.createItem(data);
  }

  update(id: number, data: UpdateItemDto) {
    this.findOne(id, { validate: true });
    return this.itemRepository.update(id, data);
  }

  remove(id: number) {
    this.findOne(id, { validate: true });
    return this.itemRepository.delete(id);
  }
}
