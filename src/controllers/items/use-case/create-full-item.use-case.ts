import { ItemService } from '@/modules/items/items.service';
import { VariantService } from '@/modules/variants/variants.service';
import { CreateFullItemDto } from '../dto/create-full-item.dto';

export class CreateFullItemUseCase {
  constructor(
    private readonly itemService?: ItemService,
    private readonly variantService?: VariantService,
  ) {
    this.itemService = itemService ?? new ItemService();
    this.variantService = variantService ?? new VariantService();
  }

  execute(data: CreateFullItemDto) {
    // TODO transaction
    const item = this.itemService.create({
      name: data.name,
      description: data.description,
    });

    const variant = this.variantService.create({
      sku: data.sku,
      name: data.name,
      description: data.description,
      price: data.price,
    });

    // TODO end transaction

    return { ...item, variant };
  }
}
