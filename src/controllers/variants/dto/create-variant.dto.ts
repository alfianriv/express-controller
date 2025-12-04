import { IsNumber, IsString } from 'class-validator';

export class CreateVariantDto {
  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
