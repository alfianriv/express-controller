import { IsNumber, IsString } from 'class-validator';

export class CreateFullItemDto {
  @IsString()
  sku: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
