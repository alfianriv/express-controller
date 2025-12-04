import { BaseRepository } from '../../../commons/database/base.repository';
import { VariantModel } from '../models/variant.model';

export class VariantRepository extends BaseRepository<VariantModel> {
  constructor() {
    super();
  }

  findOneById(id: number) {
    const user = this.findOne({ id });
    return user;
  }

  createVariant(data: Partial<VariantModel>) {
    return this.create(data);
  }
}
