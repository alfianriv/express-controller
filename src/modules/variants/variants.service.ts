import { CreateVariantDto } from '@/controllers/variants/dto/create-variant.dto';
import { UpdateVariantDto } from '@/controllers/variants/dto/update-variant.dto';
import { VariantRepository } from '@/configs/databases/repositories/variant.repository';

export class VariantService {
  constructor(private readonly variantRepository?: VariantRepository) {
    this.variantRepository = variantRepository ?? new VariantRepository();
  }

  findAll() {
    return this.variantRepository.findAll();
  }

  findOne(id: number) {
    return this.variantRepository.findOneById(id);
  }

  create(data: CreateVariantDto) {
    return this.variantRepository.createVariant(data);
  }

  update(id: number, data: UpdateVariantDto) {
    return this.variantRepository.update(id, data);
  }

  remove(id: number) {
    return this.variantRepository.delete(id);
  }
}
