import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateFullItemDto } from './dto/create-full-item.dto';
import { ItemService } from '@/modules/items/items.service';
import { CreateFullItemUseCase } from './use-case/create-full-item.use-case';

@Controller('/v1/items')
export class ItemController {
  constructor(
    private readonly itemService?: ItemService,
    private readonly createFullItemUseCase?: CreateFullItemUseCase,
  ) {
    this.itemService = this.itemService || new ItemService();
    this.createFullItemUseCase =
      this.createFullItemUseCase || new CreateFullItemUseCase();
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.itemService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateFullItemDto) {
    return this.createFullItemUseCase.execute(data);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() data: UpdateItemDto) {
    return this.itemService.update(id, data);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.itemService.remove(id);
  }
}
