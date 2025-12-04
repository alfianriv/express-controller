import { BaseModel } from '../../../commons/database/base.model';

export class VariantModel extends BaseModel {
  sku: string;

  name: string;

  description: string;

  price: number;
}
