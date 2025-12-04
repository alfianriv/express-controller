import { Controller, Delete, Get, Post, Put } from 'routing-controllers';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { VariantService } from '@/modules/variants/variants.service';

@Controller('/v1/variants')
export class VariantController {
  constructor(private readonly variantService?: VariantService) {
    this.variantService = this.variantService ?? new VariantService();
  }

  @Get()
  findAll() {
    return this.variantService.findAll();
  }

  @Get('/:id')
  findOne(id: number) {
    return this.variantService.findOne(id);
  }

  @Post()
  create(data: CreateVariantDto) {
    return this.variantService.create(data);
  }

  @Put('/:id')
  update(id: number, data: UpdateVariantDto) {
    return this.variantService.update(id, data);
  }

  @Delete('/:id')
  remove(id: number) {
    return this.variantService.remove(id);
  }
}
